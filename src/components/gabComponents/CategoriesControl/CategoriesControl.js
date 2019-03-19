import React, { Component } from 'react'
import styled from 'styled-components'
import Control from '@skyeer/react-leaflet-custom-control'

const StyledWrapper = styled.div`
  background: white;
  border: 1px solid red;
  padding: 10px;
`

class CategoriesControl extends Component {

  render() {
    const {
      categories,
    } = this.props

    return(
      <Control
        position="topright">
        <StyledWrapper>
              <h2>Categories:</h2>
              <ul>
                {categories.map((item, k) => (
                  <li key={k}>{item}</li>
                ))}
              </ul>

        </StyledWrapper>
      </Control>
    )
  }
}

export default CategoriesControl
