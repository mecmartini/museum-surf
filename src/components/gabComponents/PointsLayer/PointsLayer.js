import React, { Component } from 'react';
import { GeoJSON, Popup } from 'react-leaflet';
import geobuf from 'geobuf';
import Pbf from 'pbf';
import { MapPinIcon, MapPinIconMuseum} from '../MapMarkers';
import MapControl from '../MapControl'
import L from 'leaflet';

import 'leaflet/dist/leaflet.css';

class PointsLayer extends Component {
  count2 = 0;

  constructor(props) {
    super(props);

    this.state = {
      data: null,
      image: null,
      location: null,
      showMuseumPics: true,
      showNotMuseumPics: true,
      total: 0,
      count: 0,
    }
  }

  toggleShowMuseum = (e) => {
    const { showMuseumPics } = this.state
    this.count2 = 0;
    this.setState({ showMuseumPics: !showMuseumPics, count: 0 })
  }

  toggleShowNotMuseum = (e) => {
    const { showNotMuseumPics } = this.state
    this.count2 = 0;
    this.setState({ showNotMuseumPics: !showNotMuseumPics, count: 0 })
  }

  onEachFeature = (feature, layer) => {
    this.count2++;
    layer.on({
        click: this.handleClick,
    });
  }

  handleClick = (e) => {
    const featureProps = e.sourceTarget.feature.properties;
    this.setState({
      image: featureProps.image,
      location: featureProps.location,
    })
  }

  handlePopupClose = (e) => {
    this.setState({
      image: null,
      location: null,
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

        this.setState({ data: decodedData, total: decodedData.features.length, count: decodedData.features.length });
      })
      .catch(function (error) {
        console.log(error);
        return null
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.count !== this.count2) {
      this.setState({ count: this.count2 });
    }
  }

  render() {
    const {
      data,
      image,
      location,
      showMuseumPics,
      showNotMuseumPics
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
      console.log('TOTAL')
      console.log(this.state.total)
      console.log('COUNT')
      console.log(this.state.count)
      const layerKey = `points_layer_${showMuseumPics}_${showNotMuseumPics}`
      return (
        <GeoJSON
          key={layerKey}
          data={data}
          style={style}
          onEachFeature={this.onEachFeature}
          filter={feature => (filterLayers(feature, showMuseumPics, showNotMuseumPics)
          )}
          pointToLayer={(feature, latlng) => (pointDraw(feature, latlng))}
        >
          <MapControl
            toggleShowMuseum={this.toggleShowMuseum}
            toggleShowNotMuseum={this.toggleShowNotMuseum}
            museumVisible={showMuseumPics}
            notMuseumVisible={showNotMuseumPics}/>
          <Popup onClose={this.handlePopupClose}>
            <h5 style={h5Style}>{location}</h5>
            <img style={imgStyle} src={image} alt={location} />
          </Popup>
        </GeoJSON>
      );
    }

    return (null);
  }
}

const filterLayers = (feature, showMuseumPics, showNotMuseumPics) => {
  if (showMuseumPics === false && showNotMuseumPics === false) {
    return false;
  }

  if (showMuseumPics === true && showNotMuseumPics === true) {
    return true;
  }

  const isMuseum = feature.properties.museum;
  if (showMuseumPics === true && isMuseum === 1) {
    return true;
  }

  if (showNotMuseumPics === true && isMuseum === 0) {
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
