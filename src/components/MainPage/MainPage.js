import React, { createRef, forwardRef, Component } from 'react';
import { Map } from 'react-leaflet';
import styled from "styled-components";
import BaseMap from '../BaseMap';
import PointsLayer from '../gabComponents/PointsLayer';

import 'leaflet/dist/leaflet.css';

const MapStyled = styled(Map)`
  width: 100vw;
  height: 100vh;
`;

// 6.7499552751, 36.619987291, 18.4802470232, 47.1153931748
const bounds = [
  [
    35.2889616,
    6.6272658
  ],
  [
    47.0921462,
    18.7844746
  ]
];

class MainContainer extends Component {
  mapRef = createRef();

  constructor(props) {
    super(props)
    this.mapRef = createRef();
    console.log(this.mapRef)
  }

  render() {
    return (
      <div className="MainContainer">
        <MapStyled
          ref={this.mapRef}
          bounds={bounds}
          zoomControl={false}
        >
          <BaseMap/>

          <PointsLayer map={el => this.mapRef = el}/>
        </MapStyled>
      </div>
    )
  }
}

export default MainContainer;
