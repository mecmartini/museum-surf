import React, { Component } from 'react'
import styled from 'styled-components'
import Control from '@skyeer/react-leaflet-custom-control'

const StyledWrapper = styled.div`
  background: white;
  border: 1px solid red;
  padding: 10px;
`

const StyledButton = styled.button`
  border: none;
  background: none;
  &:hover{
    cursor: pointer;
  }
`

class CategoriesControl extends Component {

  render() {
    const {
      categories,
      handleCategoriesClick
    } = this.props

    return(
      <Control
        position="topright">
        <StyledWrapper>
              <h2>Categories:</h2>
              <ul>
                {categories.map((item, k) => (
                  <li key={k}>
                    <StyledButton
                      value={item.name}
                      onClick={handleCategoriesClick}>
                      {item.name}
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
