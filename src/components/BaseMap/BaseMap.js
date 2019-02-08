import React, { Component } from 'react';
import { TileLayer } from 'react-leaflet';

const basemap = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';
const basemapId = 'mapbox.streets';
const attribution = '© <a href="">Link</a>';

class BaseMap extends Component {
  render() {
    return(
      <TileLayer
        attribution={attribution}
        url={basemap}
        id={basemapId}
      />
    )
  }
}

export default BaseMap;
