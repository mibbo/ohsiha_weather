import React from 'react'
import Chart from "chart.js";
import classes from "./Chart.module.css";
let myLineChart;

//--Chart Style Options--//
Chart.defaults.global.defaultFontFamily = "'PT Sans', sans-serif"
Chart.defaults.global.legend.display = true;
Chart.defaults.global.background = 'red';
//--Chart Style Options--//

class HistoryChart extends React.Component {
  chartRef = React.createRef();

  componentDidMount() {
    this.buildChart();
  }

  componentDidUpdate() {
    this.buildChart();
  }

  buildChart = () => {
    const myChartRef = this.chartRef.current.getContext("2d");
    const { todayData, yesterdayData, labels } = this.props;

    if (typeof myLineChart !== "undefined") myLineChart.destroy();

    myLineChart = new Chart(myChartRef, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Today",
            data: todayData,
            fill: false,
            borderColor: "#6bb2ff"
          },
          {
            label: "Yesterday",
            data: yesterdayData,
            fill: false,
            borderColor: "#d2ebff"//"#dff1ff"
          }
        ]
      },
      options: {
        chartArea: {
          backgroundColor: 'rgba(251, 85, 85, 0.4)'
        }
      }
    });

  }

  render() {

    return (
      <div className={classes.graphContainer}>
        <canvas
          id="myChart"
          ref={this.chartRef}
        />
      </div>
    )
  }
}

export default HistoryChart;




