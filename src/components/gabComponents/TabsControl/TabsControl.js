import React, { Component } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import styled from 'styled-components'
import CategoriesControl from '../CategoriesControl'
import CountriesControl from '../CountriesControl'
import CategoriesHashtagsPieChart from '../CategoriesHashtagsPieChart'
import CountriesHashtagsPieChart from '../CountriesHashtagsPieChart'

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
      }
    }
  }
  .react-tabs__tab-panel {
    padding: 10px 15px;
    border-top: 2px solid #0065a2;
  }
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
      countrySelected,
      tabIndex,
      handleTabChange,
    } = this.props

    return(
      <StyledWrapper>
        <Tabs forceRenderTabPanel={true} selectedIndex={tabIndex} onSelect={tabIndex => handleTabChange(tabIndex)}>
          <TabList>
            <Tab>Categories</Tab>
            <Tab>Countries</Tab>
            <Tab>Category Hashtags</Tab>
            <Tab>Country Hashtags</Tab>
          </TabList>

          <TabPanel>
            <CategoriesControl
              categories={categories}
              handleCategoriesClick={handleCategoriesClick}
              handleCategoriesSelectAllClick={handleCategoriesSelectAllClick}
              handleCategoriesDeselectAllClick={handleCategoriesDeselectAllClick}
            />
          </TabPanel>
          <TabPanel>
            <CountriesControl
              countries={countries}
              handleCountriesClick={handleCountriesClick}
              handleCountriesSelectAllClick={handleCountriesSelectAllClick}
              handleCountriesDeselectAllClick={handleCountriesDeselectAllClick}
            />
          </TabPanel>
          <TabPanel>
            <CategoriesHashtagsPieChart
              categorySelected={categorySelected}
              handleTabCategoryHashtagsChange={this.handleTabCategoryHashtagsChange}
            />
          </TabPanel>
          <TabPanel>
            <CountriesHashtagsPieChart
              countrySelected={countrySelected}
              handleTabCountryHashtagsChange={this.handleTabCountryHashtagsChange}
            />
          </TabPanel>
        </Tabs>
      </StyledWrapper>
    )
  }
}

export default TabsControl
