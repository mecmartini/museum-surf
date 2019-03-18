import React, { Component } from 'react';
import { GeoJSON, Popup } from 'react-leaflet';
import geobuf from 'geobuf';
import Pbf from 'pbf';
import { MapPinIcon, MapPinIconMuseum} from '../MapMarkers';
import LayersControl from '../LayersControl'
import InfoControl from '../InfoControl'
import L from 'leaflet';

import 'leaflet/dist/leaflet.css';

class PointsLayer extends Component {
  countVisible = 0;

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
      percentageNotMuseum: null
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

  onEachFeature = (feature, layer) => {
    this.countVisible++;
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
          percentageNotMuseum: percentageNotMuseum.toFixed(2)
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
      console.log('HASHTAGS')
      console.log(hashtag)
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
          <LayersControl
            toggleShowMuseum={this.toggleShowMuseum}
            toggleShowNotMuseum={this.toggleShowNotMuseum}
            museumVisible={showMuseumPics}
            notMuseumVisible={showNotMuseumPics}/>
          <InfoControl
            total={total}
            count={count}
            totalIsMuseum={totalIsMuseum}
            totalIsNotMuseum={totalIsNotMuseum}
            percentageMuseum={percentageMuseum}
            percentageNotMuseum={percentageNotMuseum}/>
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
