import React, { Component, Fragment } from 'react';
import L from 'leaflet';
import { GeoJSON, Popup, ZoomControl } from 'react-leaflet';
import geobuf from 'geobuf';
import Pbf from 'pbf';
import styled from 'styled-components'
import { MapPinIcon, MapPinIconMuseum} from '../MapMarkers';
import LayersControl from '../LayersControl'
import InfoControl from '../InfoControl'
import './src/L.Control.Center.js'

import 'leaflet/dist/leaflet.css';
import './point-layers.min.css';

const StyledButton = styled.button`
  border: none;
  background: #17bebb;
  color: #f1ffe7;
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
  min-width: 300px;
  font-size: 16px;
  margin-bottom: 0;
`

const CountryButton = styled.button`
  border: none;
  background: #ffffff;
  color: #9e2b25;
  padding: 5px;
  text-transform: uppercase;
  border: 1px solid #9e2b25;
  box-sizing: border-box;
  font-weight: bold;
  font-style: italic;
  margin-right: 5px;
  margin-top: 5px;
  margin-bottom: 10px;
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
  :hover {
    cursor: pointer;
  }
`

class PointsLayer extends Component {
  countVisible = 0;
  categories = new Set();
  categoriesCount = {};
  countries = new Set();
  countriesCount = {};

  constructor(props) {
    super(props);

    this.state = {
      data: null,
      image: null,
      location: null,
      category: null,
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
      catLoaded: false,
      categories: [],
      countrySelected: null,
      countries: [],
      countriesLoaded: false,
    }
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

  handleCategoriesClick = (e) => {
    this.countVisible = 0;
    const value = e.target.value;
    const { categories } = this.state;
    const categoriesUpdated = categories.map(item => {
      if (item.name === value) {
        item.status = !item.status
      }
      return item
    })
    this.setState({ categories: categoriesUpdated })
  }

  handleCategoriesSelectAllClick = (e) => {
    this.countVisible = 0;
    const { categories } = this.state;
    const categoriesUpdated = categories.map(item => {
      item.status = true

      return item
    })
    this.setState({ categories: categoriesUpdated })
  }

  handleCountriesClick = (e) => {
    this.countVisible = 0;
    const value = e.target.value;
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

    layer.on({
        click: this.handleClick,
    });
  }

  handleClick = (e) => {
    const featureProps = e.sourceTarget.feature.properties;
    this.setState({
      image: featureProps.image,
      location: featureProps.location,
      hashtag: featureProps.hashtags,
      country: featureProps.country,
      category: featureProps.category,
    })
  }

  handlePopupClose = (e) => {
    this.setState({
      image: null,
      location: null,
      hashtag: null,
      country: null,
      category: null,
    })
  }

  handlePointCategoryClick = (e) => {
    const cat = e.target.value;

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
    this.setState({ categories: categoriesUpdated })
  }

  handlePointCountryClick = (e) => {
    const country = e.target.value;

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
    this.setState({ countrySelected: e.target.value, countries: countriesUpdated })
  }

  handlePointHashtagClick = (e) => {
    console.log('POINT HASHTAG CLICK')
    console.log(e.target.value)
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
      categories,
      countrySelected,
      countries,
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

      const layerKey = `points_layer_${showMuseumPics}_${showNotMuseumPics}_${countrySelected}_${catKey}_${countryKey}`

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
            <Popup onClose={this.handlePopupClose}>
              <LocationLabel>{location}</LocationLabel>
              <CountryButton value={country} onClick={this.handlePointCountryClick}>{country + ' + '}</CountryButton>
              <br />
              <img style={imgStyle} src={image} alt={location} />
              <CategoryButton value={category} onClick={this.handlePointCategoryClick}>{category + ' + '}</CategoryButton>
              {hashtag &&
                <div>
                  {
                    hashtag.map(
                      (item, key) =>
                        <StyledButton key={key} value={item} onClick={this.handlePointHashtagClick}>
                          {item}
                        </StyledButton>
                    )
                  }
                </div>
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
            countries={countries}
            handleCountriesClick={this.handleCountriesClick}
            handleCountriesSelectAllClick={this.handleCountriesSelectAllClick}
          />

          <InfoControl
            total={total}
            count={count}
            totalIsMuseum={totalIsMuseum}
            totalIsNotMuseum={totalIsNotMuseum}
            percentageMuseum={percentageMuseum}
            percentageNotMuseum={percentageNotMuseum}
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
