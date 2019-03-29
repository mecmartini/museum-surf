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
      color: #434348;
      font-size: 14px;
      &.is-museum {
        color: #9e2b25;
      }
      &.is-not-museum {
        color: #0065a2;
      }
    }
  }
  .margin-top {
    margin-top: 10px;
  }
  .shown-points {
    font-size: 16px;
  }
`

const InfoTitle = styled.h2`
  text-transform: uppercase;
  margin-top: 0;
  background: #f1ffe7;
  color: #0065a2;
  padding: 10px 0;
  text-align: center;
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
      countrySelected,
      categorySelected,
    } = this.props

    return(
      <Control
        position="topright">
        <StyledWrapper>
              <InfoTitle>Dataset Info</InfoTitle>
              <ul>
                <li>
                  <strong>Dataset reference:</strong> <i>{dataReference}</i>
                </li>
                <li>
                  <strong>Points on Map:</strong> <i>{total}</i>
                </li>
                <li className="is-museum margin-top">
                  <strong>Located in museum:</strong> <i>{totalIsMuseum} / {percentageMuseum}%</i>
                </li>
                <li className="is-not-museum">
                  <strong>Not located in museum:</strong> <i>{totalIsNotMuseum} / {percentageNotMuseum}%</i>
                </li>
                {categorySelected &&
                  <li className="margin-top">
                    <strong>Category:</strong> <i>{categorySelected}</i>
                  </li>
                }
                {countrySelected &&
                  <li className="margin-top">
                    <strong>Country:</strong> <i>{countrySelected}</i>
                  </li>
                }
                <li className="margin-top shown-points">
                  <strong>Shown points:</strong> <i>{count}</i>
                </li>
              </ul>
        </StyledWrapper>
      </Control>
    )
  }
}

export default InfoControl
