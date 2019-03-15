import React, { Component } from 'react'
import styled from 'styled-components'
import Control from '@skyeer/react-leaflet-custom-control'

const StyledWrapper = styled.div`
  background: white;
  border: 1px solid red;
  padding: 10px;
`

class InfoControl extends Component {

  render() {
    const {
      total,
      count,
      totalIsMuseum,
      totalIsNotMuseum,
      percentageMuseum,
      percentageNotMuseum,
    } = this.props

    return(
      <Control
        position="topleft">
        <StyledWrapper>
              <ul>
                <li>
                  Total points: {total}
                </li>
                <li>
                  Shown points: {count}
                </li>
                <li>
                  Museum points: {totalIsMuseum}
                </li>
                <li>
                  Not museum points: {totalIsNotMuseum}
                </li>
                <li>
                  Percentage museums: {percentageMuseum}%
                </li>
                <li>
                  Percentage not museums: {percentageNotMuseum}%
                </li>
              </ul>
        </StyledWrapper>
      </Control>
    )
  }
}

export default InfoControl
