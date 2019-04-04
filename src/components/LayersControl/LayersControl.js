import React, { Component } from 'react'
import styled from 'styled-components'
import Control from '@skyeer/react-leaflet-custom-control'
import Collapse, { Panel } from 'rc-collapse';
import InfoControl from '../InfoControl'
import TabsControl from '../TabsControl'
import { PinIcon } from '../MapMarkers'
import { PinIconMuseum } from '../MapMarkers'

import 'rc-collapse/assets/index.css';

const StyledWrapper = styled.div`
  background: white;
  border: 1px solid #f1ffe7;
  padding: 0;
  box-shadow: 0px 0px 10px 0px rgba(112,183,126,1);
  border-radius: 8px;
`

const ButtonWrapper = styled.div`
  text-align: center;
  padding: 0 12px;
  min-width: 392px;
`

const StyledButton = styled.button`
  background: transparent;
  padding: 5px;
  text-transform: uppercase;
  border: none;
  box-sizing: border-box;
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 10px;
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
    height: 20px;
    width: 22px;
  }
  & span {
    display: inline-block;
    vertical-align: middle;
  }
`

const StyledCollapse = styled(Collapse)`
  &.rc-collapse {
    border: none;
    > .rc-collapse-item {
      border: none;
      > .rc-collapse-header {
        background: #17bebb;
        color: #ffffff;
        font-weight: bold;
        text-transform: uppercase;
        padding: 5px 10px;
        border: 1px solid #f1ffe7;
        border-radius: 6px;
        font-size: 16px;
        .arrow {
          border-left-color: #ffffff;
        }
      }

      > .rc-collapse-content {
        padding: 0 5px;
        > .rc-collapse-content-box {
          margin: 5px 0;
        }
      }
    }

    > .rc-collapse-item-active {
      > .rc-collapse-header {
        background: #17bebb;
        color: #ffffff;
        font-weight: bold;
        text-transform: uppercase;
        .arrow {
          border-top-color: #ffffff;
          border-left-color: transparent;
        }
      }
    }
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
      categorySelected,
      categorySelectedHashtags,
      countrySelected,
      countrySelectedHashtags,
      accordionIndex,
      tabIndex,
      handleAccordionChange,
      handleTabChange,
      handlePointCategoryClick,
      handlePointCountryClick,
      total,
      count,
      totalIsMuseum,
      totalIsNotMuseum,
      percentageMuseum,
      percentageNotMuseum,
      hashtagSelected,
      handleHashtagRemoveClick,
      handleCategoryRemoveClick,
      handleCountryRemoveClick,
      handleResetFiltersClick,
    } = this.props

    return(
      <Control position="topleft">
        <StyledWrapper>
          <ButtonWrapper>
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
          </ButtonWrapper>

          <StyledCollapse
            accordion={true}
            activeKey={accordionIndex}
            onChange={accordionIndex => handleAccordionChange(accordionIndex)}
          >
            <Panel
              header={"Dataset Info"}
            >
              <InfoControl
                total={total}
                count={count}
                totalIsMuseum={totalIsMuseum}
                totalIsNotMuseum={totalIsNotMuseum}
                percentageMuseum={percentageMuseum}
                percentageNotMuseum={percentageNotMuseum}
                categorySelected={categorySelected}
                countrySelected={countrySelected}
                hashtagSelected={hashtagSelected}
                handleHashtagRemoveClick={handleHashtagRemoveClick}
                handleCategoryRemoveClick={handleCategoryRemoveClick}
                handleCountryRemoveClick={handleCountryRemoveClick}
                handleResetFiltersClick={handleResetFiltersClick}
              />
            </Panel>
            <Panel
              header={"Data"}
            >
              <TabsControl
                tabIndex={tabIndex}
                handleTabChange={handleTabChange}
                categories={categories}
                handleCategoriesClick={handleCategoriesClick}
                handleCategoriesSelectAllClick={handleCategoriesSelectAllClick}
                handleCategoriesDeselectAllClick={handleCategoriesDeselectAllClick}
                countries={countries}
                handleCountriesClick={handleCountriesClick}
                handleCountriesSelectAllClick={handleCountriesSelectAllClick}
                handleCountriesDeselectAllClick={handleCountriesDeselectAllClick}
                categorySelected={categorySelected}
                categorySelectedHashtags={categorySelectedHashtags}
                countrySelected={countrySelected}
                countrySelectedHashtags={countrySelectedHashtags}
                handlePointCategoryClick={handlePointCategoryClick}
                handlePointCountryClick={handlePointCountryClick}
              />
            </Panel>
          </StyledCollapse>
        </StyledWrapper>
      </Control>
    )
  }
}

export default LayersControl
