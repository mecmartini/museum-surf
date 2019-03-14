import React, { Component } from 'react'
import styled from 'styled-components'
import Control from '@skyeer/react-leaflet-custom-control'

const StyledWrapper = styled.div`
  background: white;
  border: 1px solid red;
  padding: 10px;
`

class MapControl extends Component {

  render() {
    const {
      toggleShowMuseum,
      toggleShowNotMuseum
    } = this.props

    return(
      <Control
        position="topright">
        <StyledWrapper>
          <p>Hola mundo</p>
              <button
                onClick={toggleShowMuseum}
              >Show Museum pics</button>
              <button
                onClick={toggleShowNotMuseum}
              >Show not Museum pics</button>
        </StyledWrapper>
      </Control>
    )
  }
}

export default MapControl
