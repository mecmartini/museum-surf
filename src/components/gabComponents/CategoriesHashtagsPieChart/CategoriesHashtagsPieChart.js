import React, { Component } from 'react';
import Highcharts from 'highcharts';
import {
  HighchartsChart, withHighcharts, PieSeries, Tooltip, Legend, Title, Subtitle
} from 'react-jsx-highcharts';
import styled from 'styled-components'

const EmptyLabel = styled.div`
  text-transform: uppercase;
  font-size: 14px;
  color: #0065a2;
  font-style: italic;
  text-align: center;
`

class CategoriesHashtagsPieChart extends Component {

  render() {
    const { categorySelected } = this.props;
    const title = `${categorySelected} Top 10 Hashtags`;

    if (categorySelected) {
      const chartOptions = {
        plotOptions: {
          pie: {
              cursor: 'pointer',
              dataLabels: {
                  enabled: false,
              },
              showInLegend: true,
          }
        }
      };

      const pieData = [{
        name: 'Category HASH 1',
        y: 10
      }, {
        name: 'Category HASH 2',
        y: 100
      }, {
        name: 'Category HASH 3',
        y: 35
      }];

      return (
        <HighchartsChart {...chartOptions} className="categories-hashtags-pie-chart">
          <Title>{categorySelected}</Title>
          <Subtitle>Top 10 Hashtags</Subtitle>

          <Legend layout={'horizontal'} itemDistance={5} margin={5} />

          <PieSeries name={title} data={pieData} />

          <Tooltip pointFormat={'<b>{point.percentage:.1f}%</b>'}/>
        </HighchartsChart>
      );
    }

    return(
      <EmptyLabel>
        Select a category
      </EmptyLabel>
    );
  }
}

export default withHighcharts(CategoriesHashtagsPieChart, Highcharts);
