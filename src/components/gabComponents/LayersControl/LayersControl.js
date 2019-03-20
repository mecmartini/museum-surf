import React, { Component } from 'react'
import styled from 'styled-components'
import Control from '@skyeer/react-leaflet-custom-control'

const StyledWrapper = styled.div`
  background: white;
  border: 1px solid red;
  padding: 10px;
`

class LayersControl extends Component {

  render() {
    const {
      toggleShowMuseum,
      toggleShowNotMuseum,
      museumVisible,
      notMuseumVisible
    } = this.props

    return(
      <Control
        position="topleft">
        <StyledWrapper>
          <button
            onClick={toggleShowMuseum}
          >
            {museumVisible ? 'Hide' : 'Show'} Museum pics
          </button>

          <button
            onClick={toggleShowNotMuseum}
          >
            {notMuseumVisible ? 'Hide' : 'Show'} not Museum pics
          </button>
        </StyledWrapper>
      </Control>
    )
  }
}

export default LayersControl
