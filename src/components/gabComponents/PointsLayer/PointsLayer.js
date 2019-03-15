import React, { Component } from 'react';
import { GeoJSON, Popup } from 'react-leaflet';
import geobuf from 'geobuf';
import Pbf from 'pbf';
import { MapPinIcon, MapPinIconMuseum} from '../MapMarkers';
import MapControl from '../MapControl'
import L from 'leaflet';

import 'leaflet/dist/leaflet.css';

class PointsLayer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      image: null,
      location: null,
      showMuseumPics: true,
      showNotMuseumPics: true,

    }
  }

  toggleShowMuseum = (e) => {
    const { showMuseumPics } = this.state
    this.setState({ showMuseumPics: !showMuseumPics})
  }

  toggleShowNotMuseum = (e) => {
    const { showNotMuseumPics } = this.state
    this.setState({ showNotMuseumPics: !showNotMuseumPics})
  }


  onEachFeature = (feature, layer) => {
    layer.on({
        click: this.handleClick,
    });
  }

  handleClick = (e) => {
    const featureProps = e.sourceTarget.feature.properties;
    console.log(featureProps)
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
        console.log('MAP DATA')
        console.log(decodedData)

        this.setState({ data: decodedData });
      })
      .catch(function (error) {
        console.log(error);
        return null
      });
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

    console.log(this.state)

    if (data) {
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
