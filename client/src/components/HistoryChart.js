import React, { Component } from 'react'
import Chart from "chart.js";
import classes from "./Chart.module.css";
let myLineChart;

//--Chart Style Options--//
Chart.defaults.global.defaultFontFamily = "'PT Sans', sans-serif"
Chart.defaults.global.legend.display = false;
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
            borderColor: "#dff1ff"
          }
        ]
      },
      options: {
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




