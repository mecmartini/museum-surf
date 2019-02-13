import React, { Component } from 'react';
import { GeoJSON, Popup } from 'react-leaflet';
import geobuf from 'geobuf';
import Pbf from 'pbf';
import MapPinIcon from '../MapMarkers';
import L from 'leaflet';

import 'leaflet/dist/leaflet.css';

class PointsLayer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      image: null,
      location: null,
    }
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
      return (
        <GeoJSON
          ref={"data"}
          data={data.features}
          style={style}
          onEachFeature={this.onEachFeature}
          pointToLayer={(feature, latlng) => (pointDraw(feature, latlng))}
        >
          <Popup>
            <h5 style={h5Style}>{location}</h5>
            <img style={imgStyle} src={image} alt={location} />
          </Popup>
        </GeoJSON>
      );
    }

    return (null);
  }
}

const pointDraw = (feature, latlng) => {
  return L.marker(latlng, { icon: MapPinIcon });
}

export default PointsLayer;
