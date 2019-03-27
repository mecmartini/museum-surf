import React, { Component } from 'react'
import styled from 'styled-components'
import Control from '@skyeer/react-leaflet-custom-control'
import CategoriesHashtagsPieChart from '../CategoriesHashtagsPieChart'
import CountriesHashtagsPieChart from '../CountriesHashtagsPieChart'

const StyledWrapper = styled.div`
  background: #ffffff;
  border: 1px solid #f1ffe7;
  padding: 10px;
  box-shadow: 0px 0px 10px 0px rgba(112,183,126,1);
  border-radius: 4px;
  width: 35vw;
`

class ChartsControl extends Component {

  render() {
    return(
      <Control
        position="topright">
        <StyledWrapper>
          <CategoriesHashtagsPieChart />
          <CountriesHashtagsPieChart />
        </StyledWrapper>
      </Control>
    )
  }
}

export default ChartsControl
