import React, { Component } from 'react';
import classes from "./Chart.module.css";
import HistoryChart from './HistoryChart';
// import chartIcon from "../../assets/chart-icon.svg";
import { managerData, nationalAverageData, yearLabels, managerQuarterData, nationalAverageQuarterData, quarterLabels } from "./mockData";

export default class Dashboard extends Component {
   state = {
      data: this.props.tempToday,
      average: this.props.tempYesterday,
      labels: ["00:00", "01:00", "04:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"],
      info: 'Temperature °C'
   }

   constructor(props) {
      super(props);

      console.log(this.props)
   }

   handleButtonClick = e => {
      const { value } = e.target;
      const isAnnual = value === "annual";

      const newData = isAnnual ? this.props.tempToday : this.props.humToday;
      const newAverage = isAnnual ? this.props.tempYesterday : this.props.humYesterday;
      const newInfo = isAnnual ? 'Temperature °C' : 'Humidity %';

      this.setState({
         data: newData,
         average: newAverage,
         info: newInfo
      })
   }

   render() {
      const { data, average, labels, info } = this.state;
      return (

         <div className={classes.chartcontainer}>
            <h4>{info}</h4>

            <div className={classes.buttonContainer}>
               <button
                  value="annual"
                  onClick={this.handleButtonClick}>
                  Temperature
               </button>
               <button
                  value="lastquarter"
                  onClick={this.handleButtonClick}>
                  Humidity
               </button>
            </div>
            <HistoryChart
               data={data}
               average={average}
               labels={labels}
            />
         </div>
      )
   }
}