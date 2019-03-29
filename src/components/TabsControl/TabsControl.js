import React, { Component } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import styled from 'styled-components'
import CategoriesControl from '../CategoriesControl'
import CountriesControl from '../CountriesControl'
import CategoriesHashtagsPieChart from '../CategoriesHashtagsPieChart'
import CountriesHashtagsPieChart from '../CountriesHashtagsPieChart'

import {
  IconSvgPin,
  IconSvgCategory,
  IconSvgHashtagPin,
  IconSvgHashtagCategory,
} from '../Icons'

import "react-tabs/style/react-tabs.css";

const StyledWrapper = styled.div`
  ul.react-tabs__tab-list {
    list-style: none outside none;
    padding: 0;
    text-align: center;
    border: none;
    margin: 0;
    li {
      text-transform: uppercase;
      color: #0065a2;
      background: #f1ffe7;
      border: 1px solid #f1ffe7:
      font-size: 14px;
      &.react-tabs__tab--selected {
        background: #0065a2;
        color: #f1ffe7;
        border: 1px solid #0065a2;
        font-weight: bold;
        svg {
          fill: #ffffff;
        }
      }
    }
  }
  .react-tabs__tab-panel {
    padding: 0 15px 10px;
    border: 2px solid #0065a2;
    border-radius: 8px;
    margin-top: 1px;
    background: #f1ffe7;
  }
`

const TabTitle = styled.h4`
  color: #0065a2;
  text-transform: uppercase;
  text-align: center;
  background: #f1ffe7;
  padding: 10px 5px;
  margin: 0;
`

class TabsControl extends Component {
  render() {
    const {
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
      tabIndex,
      handleTabChange,
    } = this.props

    return(
      <StyledWrapper>
        <Tabs forceRenderTabPanel={true} selectedIndex={tabIndex} onSelect={tabIndex => handleTabChange(tabIndex)}>
          <TabList>
            <Tab><IconSvgCategory/></Tab>
            <Tab><IconSvgPin/></Tab>
            <Tab><IconSvgHashtagCategory/></Tab>
            <Tab><IconSvgHashtagPin/></Tab>
          </TabList>

          <TabPanel>
            <TabTitle>Categories</TabTitle>
            <CategoriesControl
              categories={categories}
              handleCategoriesClick={handleCategoriesClick}
              handleCategoriesSelectAllClick={handleCategoriesSelectAllClick}
              handleCategoriesDeselectAllClick={handleCategoriesDeselectAllClick}
            />
          </TabPanel>
          <TabPanel>
            <TabTitle>Countries</TabTitle>
            <CountriesControl
              countries={countries}
              handleCountriesClick={handleCountriesClick}
              handleCountriesSelectAllClick={handleCountriesSelectAllClick}
              handleCountriesDeselectAllClick={handleCountriesDeselectAllClick}
            />
          </TabPanel>
          <TabPanel>
            <TabTitle>Hashtags Category</TabTitle>
            <CategoriesHashtagsPieChart
              categorySelected={categorySelected}
              categorySelectedHashtags={categorySelectedHashtags}
              handleTabCategoryHashtagsChange={this.handleTabCategoryHashtagsChange}
            />
          </TabPanel>
          <TabPanel>
            <TabTitle>Hashtags Country</TabTitle>
            <CountriesHashtagsPieChart
              countrySelected={countrySelected}
              countrySelectedHashtags={countrySelectedHashtags}
              handleTabCountryHashtagsChange={this.handleTabCountryHashtagsChange}
            />
          </TabPanel>
        </Tabs>
      </StyledWrapper>
    )
  }
}

export default TabsControl
