import React, { Component, Fragment } from 'react'
import L from 'leaflet';
import styled from 'styled-components'

const StyledList = styled.ul`
  list-style: none outside none;
  padding: 0;
  margin: 0;
  max-height: calc(100vh - 202px);
  overflow: scroll;
  li {
    margin: 0 0 5px;
    background: #0065a2;
    opacity: .8;
    &:last-child {
      margin-bottom: 0;
    }
    &.active {
      background: #0065a2;
      opacity: 1;
    }
  }
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
  background: -moz-linear-gradient(left, #9e2b25 0%, #9e2b25 ${props => props.percentage}%, transparent ${props => props.percentage + 0.1}%, transparent 100%);
  background: -webkit-linear-gradient(left, #9e2b25 0%,#9e2b25 ${props => props.percentage}%,transparent ${props => props.percentage + 0.1}%,transparent 100%);
  background: linear-gradient(to right, #9e2b25 0%,#9e2b25 ${props => props.percentage}%,transparent ${props => props.percentage + 0.1}%,transparent 100%);
  &:hover {
    cursor: pointer;
  }
  &.active,
  &.active:hover {
    border: 1px solid #0065a2;
    background: -moz-linear-gradient(left, #70b77e 0%, #70b77e ${props => props.percentage}%, transparent ${props => props.percentage + 0.1}%, transparent 100%);
    background: -webkit-linear-gradient(left, #70b77e 0%,#70b77e ${props => props.percentage}%,transparent ${props => props.percentage + 0.1}%,transparent 100%);
    background: linear-gradient(to right, #70b77e 0%,#70b77e ${props => props.percentage}%,transparent ${props => props.percentage + 0.1}%,transparent 100%);
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
  &.cat-all {
    border: 1px solid #70b77e;
    background: #70b77e;
    padding: 5px;
    text-align: center;
    &:hover {
      background: #70b77e;
    }
  }
  &.cat-not-all {
    border: 1px solid #9e2b25;
    background: #9e2b25;
    padding: 5px;
    text-align: center;
    &:hover {
      background: #9e2b25;
    }
  }
`

class CategoriesControl extends Component {

  componentDidMount() {
    const elem = L.DomUtil.get('categories-list');
    L.DomEvent.on(elem, 'mousewheel', L.DomEvent.stopPropagation);
    L.DomEvent.on(elem, 'scroll', L.DomEvent.stopPropagation);
  }

  render() {
    const {
      categories,
      handleCategoriesClick,
      handleCategoriesSelectAllClick,
      handleCategoriesDeselectAllClick,
    } = this.props

    let allCategoriesActive = true;
    if (categories.length) {
      categories.sort(compare);

      allCategoriesActive = categories.reduce(
        (allActive, category) => {
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

          active = category.status;

          return active;
        }
      )
    }

    return(
      <Fragment>
        <StyledButton
          className="btn cat-all"
          value="all"
          onClick={handleCategoriesSelectAllClick}
        >
          Select All
        </StyledButton>
        <StyledButton
          className="btn cat-not-all"
          value="all"
          onClick={handleCategoriesDeselectAllClick}
        >
          Deselect All
        </StyledButton>
        <StyledList id="categories-list">
          {categories.map((item, k) => (
            <li key={k} className={item.status ? 'active' : ''}>
              <StyledButton
                className={item.status ? 'active' : ''}
                value={item.name}
                name={item.name}
                title={item.name + '  -  ' + item.percentage + '%'}
                percentage={Number.parseFloat(item.percentage)}
                onClick={handleCategoriesClick}
              >
                {item.name}  -  {item.percentage}%
              </StyledButton>

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

export default CategoriesControl
