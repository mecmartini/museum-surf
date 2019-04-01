import React, { Component } from 'react';
import Highcharts from 'highcharts';
import {
  HighchartsChart, withHighcharts, PieSeries, Tooltip, Legend, Title, Subtitle
} from 'react-jsx-highcharts';
import styled from 'styled-components'

const EmptyLabel = styled.div`
  text-transform: uppercase;
  font-size: 14px;
  color: #ffffff;
  font-style: italic;
  text-align: center;
`

class CategoriesHashtagsPieChart extends Component {

  render() {
    const { categorySelected, categorySelectedHashtags } = this.props;
    const title = `${categorySelected} Top 10 Hashtags`;

    if (categorySelected) {
      if (!categorySelectedHashtags.length) {
        return(
          <EmptyLabel>
            The selected category has no hashtags
          </EmptyLabel>
        );
      }

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

      const pieData = categorySelectedHashtags;

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
        Select a single category...
      </EmptyLabel>
    );
  }
}

export default withHighcharts(CategoriesHashtagsPieChart, Highcharts);
