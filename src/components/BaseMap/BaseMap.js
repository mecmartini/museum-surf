import React, { Component } from 'react';
import { TileLayer } from 'react-leaflet';

const basemap = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

class BaseMap extends Component {
  render() {
    return(
      <TileLayer
        url={basemap}
      />
    )
  }
}

export default BaseMap;
