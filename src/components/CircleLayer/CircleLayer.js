import React, { Component } from 'react';
import { Circle } from 'react-leaflet';

const center = [41.8919, 12.5113];
const radius = 10000;

class CircleLayer extends Component {
  render() {
    return(
      <Circle
        center={center}
        radius={radius}
        attribution="Circle Layer"
        fillColor="red"
      />
    )
  }
}

export default CircleLayer;
