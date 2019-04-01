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

class CountriesHashtagsPieChart extends Component {

  render() {
    const { countrySelected, countrySelectedHashtags } = this.props;
    const title = `${countrySelected} Top 10 Hashtags`;

    if (countrySelected) {
      if (!countrySelectedHashtags.length) {
        return(
          <EmptyLabel>
            The selected country has no hashtags
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

      const pieData = countrySelectedHashtags

      return (
        <HighchartsChart {...chartOptions} className="countries-hashtags-pie-chart">
          <Title>{countrySelected}</Title>
          <Subtitle>Top 10 Hashtags</Subtitle>

          <Legend layout={'horizontal'} itemDistance={5} margin={5} />

          <PieSeries name={title} data={pieData} />

          <Tooltip pointFormat={'<b>{point.percentage:.1f}%</b>'}/>
        </HighchartsChart>
      );
    }

    return(
      <EmptyLabel>
        Select a single country...
      </EmptyLabel>
    );
  }
}

export default withHighcharts(CountriesHashtagsPieChart, Highcharts);
