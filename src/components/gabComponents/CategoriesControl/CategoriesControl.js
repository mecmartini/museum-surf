import React, { Component, Fragment } from 'react'
import styled from 'styled-components'

const StyledList = styled.ul`
  list-style: none outside none;
  padding: 0;
  li {
    margin-bottom: 5px;
    background: #17bebb;
    &:last-child {
      margin-bottom: 0;
    }
    &.active {
      background: #0065a2;
    }
  }
`

const StyledButton = styled.button`
  border: none;
  background: #ffffff;
  color: #ffffff;
  padding: 5px;
  text-transform: uppercase;
  border: 1px solid #0065a2;
  box-sizing: border-box;
  font-weight: bold;
  width: 100%;
  text-align: left;
  background: -moz-linear-gradient(left, #70b77e 0%, #70b77e ${props => props.percentage}%, transparent ${props => props.percentage + 0.1}%, transparent 100%);
  background: -webkit-linear-gradient(left, #70b77e 0%,#70b77e ${props => props.percentage}%,transparent ${props => props.percentage + 0.1}%,transparent 100%);
  background: linear-gradient(to right, #70b77e 0%,#70b77e ${props => props.percentage}%,transparent ${props => props.percentage + 0.1}%,transparent 100%);
  &:hover {
    cursor: pointer;
  }
  &.active,
  &.active:hover {
    background: -moz-linear-gradient(left, #70b77e 0%, #70b77e ${props => props.percentage}%, transparent ${props => props.percentage + 0.1}%, transparent 100%);
    background: -webkit-linear-gradient(left, #70b77e 0%,#70b77e ${props => props.percentage}%,transparent ${props => props.percentage + 0.1}%,transparent 100%);
    background: linear-gradient(to right, #70b77e 0%,#70b77e ${props => props.percentage}%,transparent ${props => props.percentage + 0.1}%,transparent 100%);
  }
  &.cat-all {
    border: 1px solid #70b77e;
    background: #70b77e;
    &.active,
    &.active:hover {
      background: #70b77e;
      color: #ffffff;
    }
  }
`

class CategoriesControl extends Component {

  render() {
    const {
      categories,
      handleCategoriesClick,
      handleCategoriesSelectAllClick,
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
          className={allCategoriesActive ? 'cat-all active' : 'cat-all'  }
          value="all"
          onClick={handleCategoriesSelectAllClick}
        >
          Select All
        </StyledButton>
        <StyledList>
          {categories.map((item, k) => (
            <li key={k} className={item.status ? 'active' : ''}>
              <StyledButton
                className={item.status ? 'active' : ''}
                value={item.name}
                name={item.name}
                title={item.name}
                percentage={Number.parseFloat(item.percentage)}
                onClick={handleCategoriesClick}>
                {item.name} {item.percentage}%
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
