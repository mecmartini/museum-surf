import React, { Component } from 'react'
import styled from 'styled-components'
import Control from '@skyeer/react-leaflet-custom-control'

const logoPath = './assets/logo-museum-surf.png'

const StyledWrapper = styled.div`
  background: white;
  border: 1px solid #f1ffe7;
  padding: 0;
  box-shadow: 0px 0px 10px 0px rgba(112,183,126,1);
  border-radius: 8px;
`

const LogoTitle = styled.h1`
  display: none;
`

const LogoImage = styled.img`
  width: 20vmin;
`

const LogoControl = () => (
  <Control position="topright">
    <StyledWrapper>
      <LogoTitle>Museum Surf</LogoTitle>
      <LogoImage src={logoPath} alt="Museum Surf" />
    </StyledWrapper>
  </Control>
)

export default LogoControl
