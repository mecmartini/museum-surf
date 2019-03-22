import React, { Component } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import styled from 'styled-components'
import CategoriesControl from '../CategoriesControl'
import CountriesControl from '../CountriesControl'

import "react-tabs/style/react-tabs.css";

const StyledWrapper = styled.div`
  ul {
    list-style: none outside none;
    padding: 0;
    li {
      text-transform: uppercase;
      color: #0065a2;
      font-size: 14px;
    }
  }
`

class TabsControl extends Component {

  render() {
    const {
      categories,
      handleCategoriesClick,
      handleCategoriesSelectAllClick,
      countries,
      handleCountriesClick,
      handleCountriesSelectAllClick,
    } = this.props

    return(
      <StyledWrapper>
        <Tabs forceRenderTabPanel={true}>
          <TabList>
            <Tab>Categories</Tab>
            <Tab>Countries</Tab>
          </TabList>

          <TabPanel>
            <CategoriesControl
              categories={categories}
              handleCategoriesClick={handleCategoriesClick}
              handleCategoriesSelectAllClick={handleCategoriesSelectAllClick}
            />
          </TabPanel>
          <TabPanel>
            <CountriesControl
              countries={countries}
              handleCountriesClick={handleCountriesClick}
              handleCountriesSelectAllClick={handleCountriesSelectAllClick}
            />
          </TabPanel>
        </Tabs>
      </StyledWrapper>
    )
  }
}

export default TabsControl
