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
    const { data, average, labels } = this.props;

    if (typeof myLineChart !== "undefined") myLineChart.destroy();

    myLineChart = new Chart(myChartRef, {
      type: "line",
      data: {
        //Bring in data
        labels: labels,
        datasets: [
          {
            label: "Today",
            data: data,
            fill: false,
            borderColor: "#6bb2ff"
          },
          {
            label: "Yesterday",
            data: average,
            fill: false,
            borderColor: "#dff1ff"
          }
        ]
      },
      options: {
        //Customize chart options
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




