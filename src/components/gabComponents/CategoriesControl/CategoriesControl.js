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
  &:hover {
    cursor: pointer;
  }
  &.active,
  &.active:hover {
    background: #0065a2;
    color: #f1ffe7;
  }
`

class CategoriesControl extends Component {

  render() {
    const {
      categories,
      handleCategoriesClick,
      handleCategoriesAllClick
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
                    className={allCategoriesActive ? 'active' : ''  }
                    value="all"
                    onClick={handleCategoriesAllClick}
                  >
                    <strong>All</strong>
                  </StyledButton>
                </li>
                {categories.map((item, k) => (
                  <li key={k}>
                    <StyledButton
                      className={item.status ? 'active' : ''}
                      value={item.name}
                      onClick={handleCategoriesClick}>
                      <strong>{item.name}:</strong> <i>{item.percentage}%</i>
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
