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
      &.hashtag i {
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

const StyledButton = styled.button`
  border: none;
  background: #ffffff;
  color: #17bebb;
  padding: 5px;
  text-transform: uppercase;
  border: 1px solid #17bebb;
  box-sizing: border-box;
  font-weight: bold;
  margin-right: 5px;
  margin-bottom: 5px;
  &:last-child {
    margin-right: 0;
  }
  &:hover {
    cursor: pointer;
  }
  i {
    color: #9e2b25;
  }
  &.reset-filters {
    background: #9e2b25;
    color: #ffffff;
    border-color: #9e2b25;
    margin: 0 10px 10px;
    float: right;
  }
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
      hashtagSelected,
      handleHashtagRemoveClick,
      handleCategoryRemoveClick,
      handleCountryRemoveClick,
      handleResetFiltersClick,
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
              <strong>Category:</strong> <StyledButton name={countrySelected} value={categorySelected} onClick={handleCategoryRemoveClick}>{categorySelected}  <i>x</i></StyledButton>
            </li>
          }
          {countrySelected &&
            <li className="margin-top">
              <strong>Country:</strong> <StyledButton name={countrySelected} value={countrySelected} onClick={handleCountryRemoveClick}>{countrySelected}  <i>x</i></StyledButton>
            </li>
          }
          { hashtagSelected &&
            <li className="margin-top hashtag">
              <strong>Hashtag:</strong> <StyledButton name={hashtagSelected} value={hashtagSelected} onClick={handleHashtagRemoveClick}>{hashtagSelected}  <i>x</i></StyledButton>
            </li>
          }
          <li className="margin-top shown-points">
            <strong>Shown points:</strong> <i>{count}</i>
          </li>
        </ul>
        {(categorySelected || countrySelected || hashtagSelected) &&
          <StyledButton className="reset-filters" name={'Reset'} value={'reset-filters'} onClick={handleResetFiltersClick}>Reset</StyledButton>
        }
      </StyledWrapper>
    )
  }
}

export default InfoControl
