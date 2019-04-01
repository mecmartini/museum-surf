import React, { Component, Fragment } from 'react';
import L from 'leaflet';
import { GeoJSON, Popup, ZoomControl } from 'react-leaflet';
import geobuf from 'geobuf';
import Pbf from 'pbf';
import styled from 'styled-components'
import Collapse, { Panel } from 'rc-collapse';
import { MapPinIcon, MapPinIconMuseum} from '../MapMarkers';
import LayersControl from '../LayersControl'
import InfoControl from '../InfoControl'
import './src/L.Control.Center.js'

import 'leaflet/dist/leaflet.css';
import 'rc-collapse/assets/index.css';
import './point-layers.min.css';

const StyledButton = styled.button`
  border: none;
  background: #17bebb;
  color: #ffffff;
  padding: 5px;
  text-transform: uppercase;
  border: 1px solid #17bebb;
  box-sizing: border-box;
  font-weight: bold;
  margin-right: 5px;
  margin-bottom: 5px;
  &:last-child {
    margin-right: 0;
  }
  &:hover {
    cursor: pointer;
  }
`

const LocationLabel = styled.h5`
  text-transform: uppercase;
  color: #0065a2;
  font-weight: bold;
  min-width: 260px;
  font-size: 16px;
  margin-bottom: 0;
  &.is-museum {
    color: #9e2b25;
  }
`

const CountryButton = styled.button`
  border: none;
  background: #ffffff;
  color: #0065a2;
  padding: 5px;
  text-transform: uppercase;
  border: 1px solid #0065a2;
  box-sizing: border-box;
  font-weight: bold;
  font-style: italic;
  margin-right: 5px;
  margin-top: 5px;
  margin-bottom: 10px;
  &.is-museum {
    color: #9e2b25;
    border: 1px solid #9e2b25;
  }
  :hover {
    cursor: pointer;
  }
`

const CategoryButton = styled.button`
  border: none;
  background: #0065a2;
  color: #f1ffe7;
  padding: 5px;
  text-transform: uppercase;
  border: 1px solid #0065a2;
  box-sizing: border-box;
  font-weight: bold;
  margin-right: 5px;
  margin-bottom: 5px;
  &.is-museum {
    background: #9e2b25;
    border: 1px solid #9e2b25;
  }
  :hover {
    cursor: pointer;
  }
`

const StyledCollapse = styled(Collapse)`
  &.rc-collapse {
    > .rc-collapse-item {
      > .rc-collapse-header {
        background: #17bebb;
        color: #ffffff;
        font-weight: bold;
        text-transform: uppercase;
        padding: 2px 10px;
        .arrow {
          border-left-color: #ffffff;
        }
      }

      > .rc-collapse-content {
        padding: 0 10px;
        > .rc-collapse-content-box {
          margin: 10px 0 5px;
        }
      }
    }

    > .rc-collapse-item-active {
      > .rc-collapse-header {
        background: #17bebb;
        color: #ffffff;
        font-weight: bold;
        text-transform: uppercase;
        .arrow {
          border-top-color: #ffffff;
          border-left-color: transparent;
        }
      }
    }
  }
`

class PointsLayer extends Component {
  countVisible = 0;

  categories = new Set();
  categoriesCount = {};

  countries = new Set();
  countriesCount = {};

  categoriesHashtagsCount = {};
  countriesHashtagsCount = {};

  constructor(props) {
    super(props);

    this.state = {
      data: null,
      image: null,
      location: null,
      category: null,
      isMuseum: null,
      hashtag: null,
      country: null,
      showMuseumPics: true,
      showNotMuseumPics: true,
      total: 0,
      count: 0,
      totalIsMuseum: 0,
      totalIsNotMuseum: 0,
      percentageMuseum: null,
      percentageNotMuseum: null,
      categorySelected: null,
      categorySelectedHashtags: null,
      categories: [],
      catLoaded: false,
      countrySelected: null,
      countrySelectedHashtags: null,
      countries: [],
      countriesLoaded: false,
      tabIndex: 0,
    }
  }

  onEachFeature = (feature, layer) => {
    this.countVisible++;

    const category = feature.properties.category;
    this.categories.add(category);
    if (this.categoriesCount[category] === undefined) {
      this.categoriesCount[category] = 0;
    }
    this.categoriesCount[category]++;

    const country = feature.properties.country;
    this.countries.add(country);
    if (this.countriesCount[country] === undefined) {
      this.countriesCount[country] = 0;
    }
    this.countriesCount[country]++;

    const hashtags = feature.properties.hashtags;
    if (hashtags.length) {
      hashtags.forEach((item) => {
          // Add hashtags per category
          if (this.categoriesHashtagsCount[category] === undefined) {
            this.categoriesHashtagsCount[category] = {};
          }
          if (this.categoriesHashtagsCount[category][item] === undefined) {
            this.categoriesHashtagsCount[category][item] = 0;
          }
          this.categoriesHashtagsCount[category][item]++;

          // Add hashtags per country
          if (this.countriesHashtagsCount[country] === undefined) {
            this.countriesHashtagsCount[country] = {};
          }
          if (this.countriesHashtagsCount[country][item] === undefined) {
            this.countriesHashtagsCount[country][item] = 0;
          }
          this.countriesHashtagsCount[country][item]++;
      });
    }

    layer.on({
        click: this.handleClick,
    });
  }

  toggleShowMuseum = (e) => {
    const { showMuseumPics } = this.state
    this.countVisible = 0;
    this.setState({ showMuseumPics: !showMuseumPics, count: 0 })
  }

  toggleShowNotMuseum = (e) => {
    const { showNotMuseumPics } = this.state
    this.countVisible = 0;
    this.setState({ showNotMuseumPics: !showNotMuseumPics, count: 0 })
  }

  handleTabChange = (index) => {
    this.setState({ tabIndex: index })
  }

  handleCategoriesClick = (e) => {
    this.countVisible = 0;
    const value = e.currentTarget.value;
    const { categories } = this.state;
    const categoriesUpdated = categories.map(item => {
      if (item.name === value) {
        item.status = !item.status
      }
      return item
    })
    this.setState({ categories: categoriesUpdated, categorySelected: null, categorySelectedHashtags: null })
  }

  handleCategoriesSelectAllClick = (e) => {
    this.countVisible = 0;
    const { categories } = this.state;
    const categoriesUpdated = categories.map(item => {
      item.status = true

      return item
    })
    this.setState({ categories: categoriesUpdated, categorySelected: null, categorySelectedHashtags: null })
  }

  handleCategoriesDeselectAllClick = (e) => {
    this.countVisible = 0;
    const { categories } = this.state;
    const categoriesUpdated = categories.map(item => {
      item.status = false

      return item
    })
    this.setState({ categories: categoriesUpdated, categorySelected: null, categorySelectedHashtags: null })
  }

  handleCountriesClick = (e) => {
    this.countVisible = 0;
    const value = e.currentTarget.value;
    const { countries } = this.state;
    const countriesUpdated = countries.map(item => {
      if (item.name === value) {
        item.status = !item.status
      }
      return item
    })
    this.setState({ countries: countriesUpdated, countrySelected: null })
  }

  handleCountriesSelectAllClick = (e) => {
    this.countVisible = 0;
    const { countries } = this.state;
    const countriesUpdated = countries.map(item => {
      item.status = true

      return item
    })
    this.setState({ countries: countriesUpdated, countrySelected: null })
  }

  handleCountriesDeselectAllClick = (e) => {
    this.countVisible = 0;
    const { countries } = this.state;
    const countriesUpdated = countries.map(item => {
      item.status = false

      return item
    })
    this.setState({ countries: countriesUpdated, countrySelected: null })
  }

  handleClick = (e) => {
    const featureProps = e.sourceTarget.feature.properties;
    this.setState({
      image: featureProps.image,
      location: featureProps.location,
      hashtag: featureProps.hashtags,
      country: featureProps.country,
      category: featureProps.category,
      isMuseum: featureProps.museum,
    })
  }

  handlePopupClose = (e) => {
    this.setState({
      image: null,
      location: null,
      hashtag: null,
      country: null,
      category: null,
      isMuseum: null,
    })
  }

  handlePointCategoryClick = (e) => {
    const cat = e.currentTarget.value;

    this.countVisible = 0;
    const { categories } = this.state;
    const categoriesUpdated = categories.map(item => {
      if (item.name === cat) {
        item.status = true;
      }
      else {
        item.status = false;
      }

      return item
    })

    const hashtags = categoriesUpdated.reduce(
      (hashtags, item) => {
        let items = [];

        if(Array.isArray(hashtags) && hashtags.length) {
          items = hashtags;
        }
        else if(typeof hashtags === 'object' && hashtags.name === cat) {
          items = hashtags.hashtags;
        }
        else if (item.name === cat) {
          items = item.hashtags;
        }

        return items;
      }
    )

    this.setState({ categorySelected: cat, categories: categoriesUpdated, tabIndex: 2, categorySelectedHashtags: hashtags })
  }

  handlePointCountryClick = (e) => {
    const country = e.currentTarget.value;

    this.countVisible = 0;
    const { countries } = this.state;
    const countriesUpdated = countries.map(item => {
      if (item.name === country) {
        item.status = true;
      }
      else {
        item.status = false;
      }

      return item
    })

    const hashtags = countriesUpdated.reduce(
      (hashtags, item) => {
        let items = [];

        if(Array.isArray(hashtags) && hashtags.length) {
          items = hashtags;
        }
        else if(typeof hashtags === 'object' && hashtags.name === country) {
          items = hashtags.hashtags;
        }
        else if (item.name === country) {
          items = item.hashtags;
        }

        return items;
      }
    )

    this.setState({ countrySelected: e.currentTarget.value, countries: countriesUpdated, tabIndex: 3, countrySelectedHashtags: hashtags })
  }

  handlePointHashtagClick = (e) => {
    console.log('POINT HASHTAG CLICK')
    console.log(e.currentTarget.value)
    /*
    this.countVisible = 0;
    const { categories } = this.state;
    const categoriesUpdated = categories.map(item => {
      item.status = false

      return item
    })
    this.setState({ categories: categoriesUpdated })
    */
  }

  getHashtagsList = (item) => {
    let list = []

    Object.entries(item).forEach(entry => {
      list.push({
        name: entry[0],
        y: Number.parseInt(entry[1])
      })
    });

    list.sort(this.sortHashtagsList);

    return list.slice(0, 10);
  }

  sortHashtagsList (a, b){
    if (a.value < b.value) return 1;
    if (b.value >= a.value) return -1;

    return 0;
  }

  componentDidMount() {
    const filePath = './assets/map.pbf';

    let headers = new Headers();
    headers.append("Content-Type","application/pbf");
    headers.append("Content-Encoding","gzip");
    headers.append("Accept-Encoding","gzip");

    fetch(filePath, {
      headers:headers,
    })
      .then( result => result.arrayBuffer() )
      .then( buffer => {
        const data = new Uint8Array(buffer);
        const pbfData = new Pbf(data);
        const decodedData = geobuf.decode(pbfData);

        const totalIsMuseum = decodedData.features.reduce(
          (tot, feat) => {
            if(typeof tot === 'object') {
                tot = (tot.properties.museum === 1 ? 1 : 0)
                if(feat.properties.museum === 1){
                  tot++
                }
              } else {
                tot = (feat.properties.museum === 1 ? tot + 1 : tot)
              }
              return tot
            }
          )
        const totalIsNotMuseum = decodedData.features.reduce(
          (tot, feat) => {
            if(typeof tot === 'object') {
                tot = (tot.properties.museum === 0 ? 1 : 0)
                if(feat.properties.museum === 0){
                  tot++
                }
              } else {
                tot = (feat.properties.museum === 0 ? tot + 1 : tot)
              }
              return tot
            }
          )

        const totalPoints = decodedData.features.length;
        const percentageMuseum = totalIsMuseum * 100 / totalPoints
        const percentageNotMuseum = totalIsNotMuseum * 100 / totalPoints

        this.setState({
          data: decodedData,
          total: totalPoints,
          count: totalPoints,
          totalIsMuseum: totalIsMuseum,
          totalIsNotMuseum: totalIsNotMuseum,
          percentageMuseum: percentageMuseum.toFixed(2),
          percentageNotMuseum: percentageNotMuseum.toFixed(2),
        })
      })
      .catch(function (error) {
        console.log(error);
        return null
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.count !== this.countVisible) {
      this.setState({ count: this.countVisible });
    }

    if (!this.state.catLoaded) {
      const { total } = this.state;
      this.countVisible = 0;
      const categories = [...this.categories];
      const categoriesWithStatus = categories.map(item => (
        {
          name: item,
          status: true,
          count: (this.categoriesCount[item] !== undefined ? this.categoriesCount[item] : 0),
          percentage: (this.categoriesCount[item] !== undefined ? (this.categoriesCount[item] * 100 / total).toFixed(2) : 0),
          hashtags: this.categoriesHashtagsCount[item] === undefined ? [] : this.getHashtagsList(this.categoriesHashtagsCount[item])
        }
      ))

      this.setState({
        catLoaded: true,
        categories: categoriesWithStatus,
      })
    }

    if (!this.state.countriesLoaded) {
      const { total } = this.state;
      this.countVisible = 0;
      const countries = [...this.countries];
      const countriesWithStatus = countries.map(item => (
        {
          name: item,
          status: true,
          count: (this.countriesCount[item] !== undefined ? this.countriesCount[item] : 0),
          percentage: (this.countriesCount[item] !== undefined ? (this.countriesCount[item] * 100 / total).toFixed(2) : 0),
          hashtags: this.countriesHashtagsCount[item] === undefined ? [] : this.getHashtagsList(this.countriesHashtagsCount[item])
        }
      ))

      this.setState({
        countriesLoaded: true,
        countries: countriesWithStatus,
      })
    }
  }

  render() {
    const {
      data,
      image,
      location,
      isMuseum,
      hashtag,
      country,
      category,
      showMuseumPics,
      showNotMuseumPics,
      total,
      count,
      totalIsMuseum,
      totalIsNotMuseum,
      percentageMuseum,
      percentageNotMuseum,
      categorySelected,
      categorySelectedHashtags,
      categories,
      countrySelected,
      countrySelectedHashtags,
      countries,
      tabIndex,
    } = this.state;

    const imgStyle = {
      width: "100%",
    }

    const style = {
      color: "#FFFFFF",
      fillColor: "#FFFFFF",
      opacity: 1,
      fillOpacity: 1,
      weight: 10,
      width: "20px",
      height: "20px",
    };

    if (data) {
      let catKey = 'all'
      if (categories.length) {
        catKey = categories.reduce(
          (key, category) => {
            let firstKey = key;
            if(typeof key === 'object') {
              firstKey = (key.status ? '1' : '0')
            }

            return firstKey.concat((category.status ? '1' : '0'))
          }
        )
      }

      let countryKey = 'all'
      if (countries.length) {
        countryKey = countries.reduce(
          (key, country) => {
            let firstKey = key;
            if(typeof key === 'object') {
              firstKey = (key.status ? '1' : '0')
            }

            return firstKey.concat((country.status ? '1' : '0'))
          }
        )
      }

      const layerKey = `points_layer_${showMuseumPics}_${showNotMuseumPics}_${categorySelected}_${countrySelected}_${catKey}_${countryKey}`

      return (
        <Fragment>
          <GeoJSON
            key={layerKey}
            data={data}
            style={style}
            onEachFeature={this.onEachFeature}
            filter={feature => (
              filterLayers(
                feature,
                showMuseumPics,
                showNotMuseumPics,
                categories,
                countries,
              )
            )}
            pointToLayer={(feature, latlng) => (pointDraw(feature, latlng))}
          >
            <Popup onClose={this.handlePopupClose} className={isMuseum ? 'is-museum' : 'is-not-museum'}>
              <LocationLabel className={isMuseum ? 'is-museum' : 'is-not-museum'}>{location}</LocationLabel>
              <CountryButton className={isMuseum ? 'is-museum' : 'is-not-museum'} value={country} onClick={this.handlePointCountryClick}>{country + ' + '}</CountryButton>
              <br />
              <img style={imgStyle} src={image} alt={location} />
              <CategoryButton className={isMuseum ? 'is-museum' : 'is-not-museum'} value={category} onClick={this.handlePointCategoryClick}>{category + ' + '}</CategoryButton>
              {hashtag &&
                <StyledCollapse
                  accordion={false}
                >
                  <Panel
                    header={"#Hashtags"}
                  >
                    {
                      hashtag.map(
                        (item, key) =>
                          <StyledButton key={key} value={item} onClick={this.handlePointHashtagClick}>
                            {item}
                          </StyledButton>
                      )
                    }
                  </Panel>
                </StyledCollapse>
              }
            </Popup>
          </GeoJSON>

          <LayersControl
            toggleShowMuseum={this.toggleShowMuseum}
            toggleShowNotMuseum={this.toggleShowNotMuseum}
            museumVisible={showMuseumPics}
            notMuseumVisible={showNotMuseumPics}
            categories={categories}
            handleCategoriesClick={this.handleCategoriesClick}
            handleCategoriesSelectAllClick={this.handleCategoriesSelectAllClick}
            handleCategoriesDeselectAllClick={this.handleCategoriesDeselectAllClick}
            countries={countries}
            handleCountriesClick={this.handleCountriesClick}
            handleCountriesSelectAllClick={this.handleCountriesSelectAllClick}
            handleCountriesDeselectAllClick={this.handleCountriesDeselectAllClick}
            categorySelected={categorySelected}
            categorySelectedHashtags={categorySelectedHashtags}
            countrySelected={countrySelected}
            countrySelectedHashtags={countrySelectedHashtags}
            tabIndex={tabIndex}
            handleTabChange={this.handleTabChange}
            handlePointCategoryClick={this.handlePointCategoryClick}
            handlePointCountryClick={this.handlePointCountryClick}
          />

          <InfoControl
            total={total}
            count={count}
            totalIsMuseum={totalIsMuseum}
            totalIsNotMuseum={totalIsNotMuseum}
            percentageMuseum={percentageMuseum}
            percentageNotMuseum={percentageNotMuseum}
            categorySelected={categorySelected}
            countrySelected={countrySelected}
          />

          <ZoomControl position="topcenter" />
        </Fragment>
      );
    }

    return (null);
  }
}

const filterLayers = (feature, showMuseumPics, showNotMuseumPics, categories, countries) => {
  const category = feature.properties.category
  const country = feature.properties.country

  let checkCountry = true;
  if (countries.length) {
    checkCountry = countries.reduce((countryStatus, item) => {
      if (
        typeof countryStatus === 'object'
        && countryStatus.name === country
        && countryStatus.status === true
      ) {
        return true
      }

      if (countryStatus === true) {
        return true
      }

      if (
        item.name === country
        && item.status === true
      ) {
        return true
      }

      return false;
    })
  }

  let checkCategory = true;
  if (categories.length) {
    checkCategory = categories.reduce((catStatus, cat) => {
      if (
        typeof catStatus === 'object'
        && catStatus.name === category
        && catStatus.status === true
      ) {
        return true
      }

      if (catStatus === true) {
        return true
      }

      if (
        cat.name === category
        && cat.status === true
      ) {
        return true
      }

      return false;
    })
  }

  if (showMuseumPics === false && showNotMuseumPics === false) {
    return false;
  }

  if (
    showMuseumPics === true
    && showNotMuseumPics === true
    && checkCategory
    && checkCountry
  ) {
    return true;
  }

  const isMuseum = feature.properties.museum;
  if (showMuseumPics === true && isMuseum === 1 && checkCategory && checkCountry) {
    return true;
  }

  if (showNotMuseumPics === true && isMuseum === 0 && checkCategory && checkCountry) {
    return true;
  }

  return false;
}

const pointDraw = (feature, latlng) => {
  const museumValue = feature.properties.museum
  const pinIcon = museumValue === 1 ? MapPinIconMuseum : MapPinIcon
  return L.marker(latlng, { icon: pinIcon });
}

export default PointsLayer;
