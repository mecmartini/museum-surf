import React, { Component } from 'react'
import styled from 'styled-components'
import Control from '@skyeer/react-leaflet-custom-control'

const dataReference = "1092";

const StyledWrapper = styled.div`
  background: white;
  border: 1px solid red;
  padding: 10px;
  ul {
    list-style: none outside none;
    padding: 0;
    li {
      text-transform: uppercase;
      color: #0065a2;
      font-size: 14px;
    }
  }
`

const CountryLabel = styled.h3`
  text-transform: uppercase;
  color: #0065a2;
`

class InfoControl extends Component {

  render() {
    const {
      total,
      count,
      totalIsMuseum,
      totalIsNotMuseum,
      percentageMuseum,
      percentageNotMuseum,
      countrySelected
    } = this.props

    return(
      <Control
        position="topright">
        <StyledWrapper>
              { countrySelected &&
                <CountryLabel>{countrySelected}</CountryLabel>
              }
              <ul>
                <li>
                  <strong>Data reference:</strong> <i>{dataReference}</i>
                </li>
                <li>
                  <strong>Total points:</strong> <i>{total}</i>
                </li>
                <li>
                  <strong>Museum points:</strong> <i>{totalIsMuseum}</i>
                </li>
                <li>
                  <strong>Percentage museums:</strong> <i>{percentageMuseum}%</i>
                </li>
                <li>
                  <strong>Not museum points:</strong> <i>{totalIsNotMuseum}</i>
                </li>
                <li>
                  <strong>Percentage not museums:</strong> <i>{percentageNotMuseum}%</i>
                </li>
                <li>
                  <strong>Shown points:</strong> <i>{count}</i>
                </li>
              </ul>
        </StyledWrapper>
      </Control>
    )
  }
}

export default InfoControl
