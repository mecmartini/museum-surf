import React, { Component } from 'react'
import styled from 'styled-components'

const StyledList = styled.ul`
  list-style: none outside none;
  padding: 0;
  li {
    margin-bottom: 5px;
    &:last-child {
      margin-bottom: 0;
    }
  }
`

const StyledButton = styled.button`
  border: none;
  background: #ffffff;
  color: #0065a2;
  padding: 5px;
  text-transform: uppercase;
  border: 1px solid #0065a2;
  box-sizing: border-box;
  font-weight: bold;
  &:hover {
    cursor: pointer;
  }
  &.active,
  &.active:hover {
    background: #0065a2;
    color: #f1ffe7;
  }
  &.cat-all {
    border: 1px solid #70b77e;
    background: #70b77e;
    color: #ffffff;
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
      <StyledList>
        <li>
          <StyledButton
            className={allCategoriesActive ? 'cat-all active' : 'cat-all'  }
            value="all"
            onClick={handleCategoriesSelectAllClick}
          >
            Select All
          </StyledButton>
        </li>
        {categories.map((item, k) => (
          <li key={k}>
            <StyledButton
              className={item.status ? 'active' : ''}
              value={item.name}
              onClick={handleCategoriesClick}>
              {item.name}: {item.percentage}%
            </StyledButton>

          </li>
        ))}
      </StyledList>
    )
  }
}

export default CategoriesControl
