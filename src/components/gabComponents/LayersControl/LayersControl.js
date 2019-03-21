import React, { Component } from 'react'
import styled from 'styled-components'
import Control from '@skyeer/react-leaflet-custom-control'

const StyledWrapper = styled.div`
  background: white;
  border: 1px solid red;
  padding: 10px;
`

const StyledButton = styled.button`
  background: #9e2b25;
  color: #ffffff;
  padding: 5px;
  text-transform: uppercase;
  border: none;
  box-sizing: border-box;
  font-weight: bold;
  &.active,
  &.active:hover {
    background: #70b77e;
  }
  &.margin-sx {
    margin-left: 10px;
  }
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
          <StyledButton
            className={museumVisible ? 'active' : ''}
            onClick={toggleShowMuseum}
          >
            {museumVisible ? 'Hide' : 'Show'} Museum
          </StyledButton>

          <StyledButton
            className={notMuseumVisible ? 'active margin-sx' : 'margin-sx'}
            onClick={toggleShowNotMuseum}
          >
            {notMuseumVisible ? 'Hide' : 'Show'} Not Museum
          </StyledButton>
        </StyledWrapper>
      </Control>
    )
  }
}

export default LayersControl
