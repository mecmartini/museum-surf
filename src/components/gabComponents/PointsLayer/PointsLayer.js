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
      showNotMuseumPics: false,

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
      return (
        <GeoJSON
          ref={"data"}
          data={data}
          style={style}
          showMuseumPics={this.state.showMuseumPics}
          showNotMuseumPics={this.state.showNotMuseumPics}
          onEachFeature={this.onEachFeature}
          filter={feature => (filterLayers(feature, showMuseumPics, showNotMuseumPics)
          )}
          pointToLayer={(feature, latlng) => (pointDraw(feature, latlng))}
        >
          <MapControl
            toggleShowMuseum={this.toggleShowMuseum}
            toggleShowNotMuseum={this.toggleShowNotMuseum}/>
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

const filterLayers =
(feature, showMuseumPics, showNotMuseumPics) => {
  {console.log(`${showMuseumPics} + ${showNotMuseumPics}`)}
}

const pointDraw = (feature, latlng) => {
  const museumValue = feature.properties.museum
  const pinIcon = museumValue === 1 ? MapPinIconMuseum : MapPinIcon
  return L.marker(latlng, { icon: pinIcon });
}

export default PointsLayer;
