import React from 'react';
import styled from 'styled-components';

const IconSvgRAW = styled.svg`
  height: 20px;
  width: auto;
  opacity: 1;
  fill: #ffffff;
`

const IconSvgPie = () => (
  <IconSvgRAW x="0px" y="0px" viewBox="0 0 32 32" preserveAspectRatio="xMinYMin meet">
    <g transform="translate(288 288)">
    	<path d="M-272.8-271.5l8,13.8c-2.1,1.1-4.6,1.7-7.1,1.7c-8.9,0-16-7.2-16-16c0-8.5,6.6-15.5,15-16v16
    		C-273-271.9-272.9-271.7-272.8-271.5L-272.8-271.5z M-256-273h-15v-15C-262.9-287.5-256.5-281.1-256-273z M-269-275h10.7
    		c-1.2-5.3-5.4-9.5-10.7-10.7V-275z M-263.1-258.7c4.1-2.7,6.8-7.2,7.1-12.3h-14.2L-263.1-258.7z"/>
    </g>
	</IconSvgRAW>
);

export default IconSvgPie;
