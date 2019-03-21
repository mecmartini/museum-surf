import React, { Component } from 'react'
import styled from 'styled-components'
import Control from '@skyeer/react-leaflet-custom-control'

const StyledWrapper = styled.div`
  background: white;
  border: 1px solid red;
  padding: 10px;
  ul {
    list-style: none outside none;
    li {
      margin-bottom: 5px;
      &:last-child {
        margin-bottom: 0;
      }
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
  &.cat-none {
    border: 1px solid #9e2b25;
    background: #9e2b25;
    color: #ffffff;
    margin-left: 10px;
    &.active,
    &.active:hover {
      background: #9e2b25;
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
      handleCategoriesDeselectAllClick
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
      <Control
        position="topright">
        <StyledWrapper>
              <h2>Categories:</h2>
              <ul>
                <li>
                  <StyledButton
                    className={allCategoriesActive ? 'cat-all active' : 'cat-all'  }
                    value="all"
                    onClick={handleCategoriesSelectAllClick}
                  >
                    Select All
                  </StyledButton>
                  <StyledButton
                    className={allCategoriesActive ? 'cat-none active' : 'cat-none'  }
                    value="all"
                    onClick={handleCategoriesDeselectAllClick}
                  >
                    Deselect All
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
              </ul>

        </StyledWrapper>
      </Control>
    )
  }
}

export default CategoriesControl
