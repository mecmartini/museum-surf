import React, { Component, Fragment } from 'react'
import L from 'leaflet'
import styled from 'styled-components'
import { IconSvgPie } from '../Icons'

const StyledList = styled.ul`
  list-style: none outside none;
  padding: 0;
  margin: 0;
  max-height: calc(100vh - 202px);
  overflow-x: hidden;
  overflow-y: scroll;
  li {
    margin: 0 0 5px;
    opacity: .7;
    &:last-child {
      margin-bottom: 0;
    }
    &.active {
      opacity: 1;
    }
  }
`

const StyledButtonWrapper = styled.span`
  width: calc(100% - 25px);
  background: #434348;
  display: inline-block;
  vertical-align: middle;
`

const StyledButton = styled.button`
  border: none;
  color: #ffffff;
  padding: 4px;
  text-transform: uppercase;
  border: 1px solid #17bebb;
  box-sizing: border-box;
  font-weight: bold;
  width: 100%;
  text-align: left;
  background: -moz-linear-gradient(left, #9e2b25 0%, #9e2b25 calc(${props => props.percentage}%), transparent calc(${props => props.percentage + 0.1}%), transparent 100%);
  background: -webkit-linear-gradient(left, #9e2b25 0%,#9e2b25 calc(${props => props.percentage}%),transparent calc(${props => props.percentage + 0.1}%),transparent 100%);
  background: linear-gradient(to right, #9e2b25 0%,#9e2b25 calc(${props => props.percentage}%),transparent calc(${props => props.percentage + 0.1}%),transparent 100%);
  &:hover {
    cursor: pointer;
  }
  &.active,
  &.active:hover {
    border: 1px solid #0065a2;
    background: -moz-linear-gradient(left, #70b77e 0%, #70b77e calc(${props => props.percentage}%), transparent calc(${props => props.percentage + 0.1}%), transparent 100%);
    background: -webkit-linear-gradient(left, #70b77e 0%,#70b77e calc(${props => props.percentage}%),transparent calc(${props => props.percentage + 0.1}%),transparent 100%);
    background: linear-gradient(to right, #70b77e 0%,#70b77e calc(${props => props.percentage}%),transparent calc(${props => props.percentage + 0.1}%),transparent 100%);
  }
  &.btn {
    background: transparent;
    padding: 5px;
    margin: 0 5px;
    text-transform: uppercase;
    border: none;
    box-sizing: border-box;
    font-weight: bold;
    margin-bottom: 10px;
    border: 1px solid #70b77e;
    border-radius: 50px;
    border: 4px solid #f1ffe7;
    font-size: 12px;
    text-align: left;
    width: calc(50% - 10px);
  }
  &.countries-all {
    border: 1px solid #70b77e;
    background: #70b77e;
    padding: 5px;
    text-align: center;
    &:hover {
      background: #70b77e;
    }
  }
  &.countries-not-all {
    border: 1px solid #9e2b25;
    background: #9e2b25;
    padding: 5px;
    text-align: center;
    &:hover {
      background: #9e2b25;
    }
  }
  .item-name,
  .item-percentage {
    display: inline-block;
  }
  .item-name {
    float: left;
  }
  .item-percentage {
    float: right;
    font-weight: normal;
    font-style: italic;
    color: #f1ffe7;
    padding: 0 10px;
  }
`

const PieButton = styled.button`
  border: none;
  background: transparent;
  width: 25px;
  text-align: center;
  display: inline-block;
  vertical-align: middle;
  padding: 0;
  &:hover {
    cursor: pointer;
  }
`

class CountriesControl extends Component {

  componentDidMount() {
    const elem = L.DomUtil.get('countries-list');
    L.DomEvent.on(elem, 'mousewheel', L.DomEvent.stopPropagation);
    L.DomEvent.on(elem, 'scroll', L.DomEvent.stopPropagation);
  }

  render() {
    const {
      countries,
      handleCountriesClick,
      handleCountriesSelectAllClick,
      handleCountriesDeselectAllClick,
      handlePointCountryClick,
    } = this.props

    let allCountriesActive = true;
    if (countries.length) {
      countries.sort(compare);

      allCountriesActive = countries.reduce(
        (allActive, country) => {
          let active = true;
          if(typeof allActive === 'object') {
            active = allActive.status;
          }
          else {
            active = allActive;
          }

          if (!active) {
            return active
          }

          active = country.status;

          return active;
        }
      )
    }

    return(
      <Fragment>
        <StyledButton
          className="btn countries-all"
          value="all"
          onClick={handleCountriesSelectAllClick}
        >
          Select All
        </StyledButton>
        <StyledButton
          className="btn countries-not-all"
          value="all"
          onClick={handleCountriesDeselectAllClick}
        >
          Deselect All
        </StyledButton>
        <StyledList id="countries-list">
          {countries.map((item, k) => (
            <li key={k} className={item.status ? 'active' : ''}>
              <PieButton
                name={item.name}
                value={item.name}
                title={item.name}
                onClick={handlePointCountryClick}
              >
                <IconSvgPie/>
              </PieButton>

              <StyledButtonWrapper>
                <StyledButton
                  className={item.status ? 'active' : ''}
                  value={item.name}
                  name={item.name}
                  title={item.name + '  -  ' + item.percentage + '%'}
                  percentage={Number.parseFloat(item.percentage)}
                  onClick={handleCountriesClick}
                >
                  <span className="item-name">{item.name}</span>
                  <span className="item-percentage">{item.percentage}%</span>
                </StyledButton>
              </StyledButtonWrapper>
            </li>
          ))}
        </StyledList>
      </Fragment>
    )
  }
}

function compare(a, b){
  if (a.name >= b.name) return 1;
  if (b.name < a.name) return -1;

  return 0;
}

export default CountriesControl
