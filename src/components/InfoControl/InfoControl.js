import React, { Component } from 'react'
import styled from 'styled-components'

const dataReference = "1092";

const StyledWrapper = styled.div`
  ul {
    padding: 0 10px;
    list-style: none outside none;
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
      &.hashtag {
        text-transform: none;
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
  background: #17bebb;
  color: #ffffff;
  padding: 10px 0;
  text-align: center;
  border-radius: 4px 4px 0 0;
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
      hashtagSelectd,
    } = this.props

    return(
      <StyledWrapper>
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
          { hashtagSelectd &&
            <li className="margin-top hashtag">
              <strong>Hashtag:</strong> <i>{hashtagSelectd}</i>
            </li>
          }
          <li className="margin-top shown-points">
            <strong>Shown points:</strong> <i>{count}</i>
          </li>
        </ul>
      </StyledWrapper>
    )
  }
}

export default InfoControl
