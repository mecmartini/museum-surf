import React, { Component } from 'react'
import styled from 'styled-components'
import Control from '@skyeer/react-leaflet-custom-control'

const dataReference = "1092";

const StyledWrapper = styled.div`
  background: #ffffff;
  border: 1px solid #f1ffe7;
  padding: 10px;
  box-shadow: 0px 0px 10px 0px rgba(112,183,126,1);
  border-radius: 4px;
  ul {
    list-style: none outside none;
    padding: 0;
    li {
      text-transform: uppercase;
      color: #70b77e;
      font-size: 14px;
      &.is-museum {
        color: #9e2b25;
      }
      &.is-not-museum {
        color: #0065a2;
      }
    }
  }
`

const InfoTitle = styled.h2`
  text-transform: uppercase;
  color: #70b77e;
`

const CountryLabel = styled.h3`
  text-transform: uppercase;
  font-style: italic;
  color: #70b77e;
  border: 1px solid #70b77e;
  display: inline;
  padding: 5px;
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
              <InfoTitle>Dataset Info</InfoTitle>
              { countrySelected &&
                <CountryLabel>{countrySelected}</CountryLabel>
              }
              <ul>
                <li>
                  <strong>Dataset reference:</strong> <i>{dataReference}</i>
                </li>
                <li>
                  <strong>Points on Map:</strong> <i>{total}</i>
                </li>
                <li className="is-museum">
                  <strong>Located in museum:</strong> <i>{totalIsMuseum} / {percentageMuseum}%</i>
                </li>
                <li className="is-not-museum">
                  <strong>Not located in museum:</strong> <i>{totalIsNotMuseum} / {percentageNotMuseum}%</i>
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
