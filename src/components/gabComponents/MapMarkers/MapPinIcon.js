import React from 'react';
import L from 'leaflet';
import ReactDOMServer from 'react-dom/server';
import styled from 'styled-components';

const IconSvgRAW = styled.svg`
  height: 30px;
  width: 30px;
  opacity: 1;
  fill: #6969b3;
`

const Icon = () => (
  <IconSvgRAW x="0px" y="0px" viewBox="0 0 32 32" preserveAspectRatio="xMinYMin meet">
    <g>
      <g><ellipse cx="16.01" cy="12.484" rx="2.688" ry="2.605"/>
        <path d="M20.603,7.488h-1.674c-0.231,0-0.418,0.187-0.418,0.418V9.58c0,0.231,0.187,0.418,0.418,0.418h1.674    c0.231,0,0.418-0.187,0.418-0.418V7.907C21.021,7.675,20.834,7.488,20.603,7.488z"/>
        <path d="M20.171,12.629c0,2.226-1.863,4.031-4.161,4.031c-2.297,0-4.161-1.806-4.161-4.031c0-0.4,0.061-0.785,0.173-1.149    l-1.043-0.227v5.858c0,0.293,0.126,0.418,0.418,0.418h9.206c0.293,0,0.418-0.125,0.418-0.418v-5.858l-1.023,0.227    C20.11,11.845,20.171,12.23,20.171,12.629z"/>
        <path d="M16,0C8.974,0,3.278,5.696,3.278,12.722c0,5.666,3.706,10.462,8.825,12.108L16,32l3.898-7.169    c5.119-1.647,8.825-6.443,8.825-12.108C28.722,5.696,23.026,0,16,0z M22.695,17.531c0,0.945-0.729,1.674-1.674,1.674H10.979    c-0.945,0-1.674-0.729-1.674-1.674V7.488c0-0.945,0.729-1.674,1.674-1.674h10.043c0.945,0,1.674,0.729,1.674,1.674V17.531z"/>
      </g>
    </g>
	</IconSvgRAW>
);

const MapPinIcon = L.divIcon({
  className: 'map-pin',
  html: ReactDOMServer.renderToString(<Icon/>)
});

export default MapPinIcon;
