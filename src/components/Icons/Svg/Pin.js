import React from 'react';
import styled from 'styled-components';

const IconSvgRAW = styled.svg`
  height: 25px;
  width: auto;
  opacity: 1;
  fill: #17bebb;
`

const IconSvgPin = () => (
  <IconSvgRAW x="0px" y="0px" viewBox="0 0 32 32" preserveAspectRatio="xMinYMin meet">
    <path d="M4 12 A12 12 0 0 1 28 12 C28 20, 16 32, 16 32 C16 32, 4 20 4 12 M11 12 A5 5 0 0 0 21 12 A5 5 0 0 0 11 12 Z"/>
	</IconSvgRAW>
);

export default IconSvgPin;
