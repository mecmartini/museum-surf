import React, { Component } from 'react'
import styled from 'styled-components'
import Control from '@skyeer/react-leaflet-custom-control'
import TabsControl from '../TabsControl'
import { PinIcon } from '../MapMarkers'
import { PinIconMuseum } from '../MapMarkers'

const StyledWrapper = styled.div`
  background: white;
  border: 1px solid #f1ffe7;
  padding: 10px;
  box-shadow: 0px 0px 10px 0px rgba(112,183,126,1);
  border-radius: 4px;
`

const StyledButton = styled.button`
  background: transparent;
  padding: 5px;
  text-transform: uppercase;
  border: none;
  box-sizing: border-box;
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 20px;
  border-radius: 50px;
  border: 2px solid #f1ffe7;
  font-size: 12px;
  text-align: left;
  box-shadow: 0px 0px 5px 0px rgba(112,183,126,1);
  &:hover {
    cursor: pointer;
  }
  &.active,
  &.active:hover {
    background: #f1ffe7;
  }
  &.btn-museum {
    color: #9e2b25;
    border-color: #9e2b25;
    margin-right: 5px;
    opacity: .6;
    &.active,
    &.active:hover {
      color: #9e2b25;
      opacity: 1;
    }
  }
  &.btn-not-museum {
    color: #0065a2;
    border-color: #0065a2;
    opacity: .6;
    &.active,
    &.active:hover {
      color: #0065a2;
      opacity: 1;
    }
  }
  & svg {
    display: inline-block;
    vertical-align: middle;
    height: 25px;
  }
  & span {
    display: inline-block;
    vertical-align: middle;
  }

`

class LayersControl extends Component {
  render() {
    const {
      toggleShowMuseum,
      toggleShowNotMuseum,
      museumVisible,
      notMuseumVisible,
      categories,
      handleCategoriesClick,
      handleCategoriesSelectAllClick,
      handleCategoriesDeselectAllClick,
      countries,
      handleCountriesClick,
      handleCountriesSelectAllClick,
      handleCountriesDeselectAllClick,
    } = this.props

    return(
      <Control position="topleft">
        <StyledWrapper>
          <StyledButton
            className={museumVisible ? 'active btn-museum' : 'btn-museum'}
            onClick={toggleShowMuseum}
          >
            <PinIconMuseum/>
            <span>Located in Museum</span>
          </StyledButton>

          <StyledButton
            className={notMuseumVisible ? 'active btn-not-museum' : 'btn-not-museum'}
            onClick={toggleShowNotMuseum}
          >
            <PinIcon/>
            <span>Not Located in Museum</span>
          </StyledButton>

          <TabsControl
            categories={categories}
            handleCategoriesClick={handleCategoriesClick}
            handleCategoriesSelectAllClick={handleCategoriesSelectAllClick}
            handleCategoriesDeselectAllClick={handleCategoriesDeselectAllClick}
            countries={countries}
            handleCountriesClick={handleCountriesClick}
            handleCountriesSelectAllClick={handleCountriesSelectAllClick}
            handleCountriesDeselectAllClick={handleCountriesDeselectAllClick}
          />
        </StyledWrapper>
      </Control>
    )
  }
}

export default LayersControl
