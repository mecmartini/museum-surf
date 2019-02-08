import React, { Component, Fragment } from 'react';
import { Marker, Popup } from 'react-leaflet';
import geobuf from 'geobuf';
import Pbf from 'pbf';
import MapPinIcon from '../MapMarkers';

class PointsLayer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      markers: [],
      labels: [],
    }
  }

  onEachFeature = (feature, layer) => {
    const { regionLayerClick } = this.props;
    const { markers } = this.state;
    const popLegend = feature.properties.legend_values_pop;
    const constCapita = feature.properties.e_cost_capit;
    const pop = feature.properties.pop;

    const bounds = layer.getBounds();
    const center = bounds.getCenter();

    const markerCoord = {
      lat: feature.properties.marker_lat,
      lng: feature.properties.marker_long,
    };
    const markerData = {
      coord: markerCoord,
      popLegend: popLegend,
      pop: Math.trunc(pop),
      costCapita: Math.trunc(constCapita),
      name: feature.properties.name,
      center: center,
    }
    markers.push(markerData);

    layer.on({
        click: regionLayerClick,
        mouseover: this.handleMouseover,
        mouseout: this.handleMouseout,
    });

    this.setState({ markers: markers });
  }

  getStyle = (feature) =>  {
    const style = {
      color: "#FFFFFF",
      fillColor: "#FFFFFF",
      opacity: 1,
      fillOpacity: 1,
      weight: 1,
    };
    return style;
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
        this.buildMarkers(decodedData);
      })
      .catch(function (error) {
        console.log(error);
        return null
      });
  }

  buildMarkers = (points) => {
    const markers = points.features.map((point) => pointMarker(point))
    this.setState({ markers })
  }

  render() {
    const {
      data,
      markers
    } = this.state;

    const imgStyle = {
      width: "100%",
    }

    const h5Style = {
      minWidth: "250px",
    }

    if (data && markers) {
      return (
        <Fragment>

          {markers && markers.map((item, key) =>
            <Marker
              //interactive={false}
              icon={MapPinIcon}
              key={key}
              position={item.coord}
            >
              <Popup>
                <h5 style={h5Style}>{item.location}</h5>
                <img style={imgStyle} src={item.image} alt={item.location} />
              </Popup>
            </Marker>
          )}

        </Fragment>
      );
    }

    return (null);
  }
}

const pointMarker = (point) => {
  const markerCoord = {
    lat: point.geometry.coordinates[1],
    lng: point.geometry.coordinates[0],
  };
  const markerData = {
    coord: markerCoord,
    image: point.properties.image,
    location: point.properties.location,
  }

  return markerData;
}

export default PointsLayer;
