import React, { Component } from 'react';
import Highcharts from 'highcharts';
import {
  HighchartsChart, withHighcharts, PieSeries, Tooltip, Legend, Title
} from 'react-jsx-highcharts';

class CountriesHashtagsPieChart extends Component {

  render() {
    const title = "Country Top Hashtags";

    if (true) {
      const chartOptions = {
        plotOptions: {
          pie: {
              cursor: 'pointer',
              dataLabels: {
                  enabled: true,
                  format: '<span style="color:{point.color};">{point.name}: <b style="color:{point.color};>{point.percentage:.1f} %</b></span>',
                  color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black',
              },
              showInLegend: true,
          }
        }
      };

      const pieData = [{
        name: 'Country HASH 1',
        y: 60
      }, {
        name: 'Country HASH 2',
        y: 200
      }, {
        name: 'Country HASH 3',
        y: 135
      }];

      return (
        <HighchartsChart {...chartOptions} className="countries-hashtags-pie-chart">
          <Title>{title}</Title>

          <Legend layout={'vertical'} />

          <PieSeries name={title} data={pieData} />

          <Tooltip pointFormat={'<b>{point.percentage:.1f}%</b>'}/>
        </HighchartsChart>
      );
    }

    return(
      null
    );
  }
}

export default withHighcharts(CountriesHashtagsPieChart, Highcharts);
