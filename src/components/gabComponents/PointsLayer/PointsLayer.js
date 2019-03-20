import React, { Component, Fragment } from 'react';
import L from 'leaflet';
import { GeoJSON, Popup, ZoomControl } from 'react-leaflet';
import geobuf from 'geobuf';
import Pbf from 'pbf';
import { MapPinIcon, MapPinIconMuseum} from '../MapMarkers';
import LayersControl from '../LayersControl'
import InfoControl from '../InfoControl'
import './src/L.Control.Center.js'
import CategoriesControl from '../CategoriesControl'

import 'leaflet/dist/leaflet.css';
import './point-layers.min.css';

class PointsLayer extends Component {
  countVisible = 0;
  categories = new Set();
  categoriesCount = {};

  constructor(props) {
    super(props);

    this.state = {
      data: null,
      image: null,
      location: null,
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

  handleCategoriesAllClick = (e) => {
    this.countVisible = 0;
    const { categories } = this.state;
    const categoriesUpdated = categories.map(item => {
      item.status = true

      return item
    })
    this.setState({ categories: categoriesUpdated })
  }

  onEachFeature = (feature, layer) => {
    const category = feature.properties.category;
    this.countVisible++;
    this.categories.add(category);
    if (this.categoriesCount[category] === undefined) {
      this.categoriesCount[category] = 0;
    }
    this.categoriesCount[category]++;

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
    })
  }

  handlePopupClose = (e) => {
    this.setState({
      image: null,
      location: null,
      hashtag: null,
      country: null,
    })
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
  }

  render() {
    const {
      data,
      image,
      location,
      hashtag,
      country,
      showMuseumPics,
      showNotMuseumPics,
      total,
      count,
      totalIsMuseum,
      totalIsNotMuseum,
      percentageMuseum,
      percentageNotMuseum,
      categories
    } = this.state;

    const imgStyle = {
      width: "100%",
    }

    const h5Style = {
      minWidth: "250px",
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
      const layerKey = `points_layer_${showMuseumPics}_${showNotMuseumPics}_${catKey}`

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
                categories
              )
            )}
            pointToLayer={(feature, latlng) => (pointDraw(feature, latlng))}
          >
            <Popup onClose={this.handlePopupClose}>
              <h5 style={h5Style}>{location}</h5>
              <img style={imgStyle} src={image} alt={location} />
              {hashtag &&
                <ul>
                  {hashtag.map((item) => <li>{item}</li>)}
                </ul>
              }
              <b>Country:</b><span>{country}</span>
            </Popup>
          </GeoJSON>

          <LayersControl
            toggleShowMuseum={this.toggleShowMuseum}
            toggleShowNotMuseum={this.toggleShowNotMuseum}
            museumVisible={showMuseumPics}
            notMuseumVisible={showNotMuseumPics}
          />

          <InfoControl
            total={total}
            count={count}
            totalIsMuseum={totalIsMuseum}
            totalIsNotMuseum={totalIsNotMuseum}
            percentageMuseum={percentageMuseum}
            percentageNotMuseum={percentageNotMuseum}
          />

          <CategoriesControl
            categories={categories}
            handleCategoriesClick={this.handleCategoriesClick}
            handleCategoriesAllClick={this.handleCategoriesAllClick}
          />

          <ZoomControl position="topcenter" />
        </Fragment>
      );
    }

    return (null);
  }
}

const filterLayers = (feature, showMuseumPics, showNotMuseumPics, categories) => {
  const category = feature.properties.category
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
  ) {
    return true;
  }

  const isMuseum = feature.properties.museum;
  if (showMuseumPics === true && isMuseum === 1 && checkCategory) {
    return true;
  }

  if (showNotMuseumPics === true && isMuseum === 0 && checkCategory) {
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
