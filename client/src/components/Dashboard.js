import React, { Component } from 'react';
import classes from "./Dashboard.module.css";
import HistoryChart from './HistoryChart';
// import chartIcon from "../../assets/chart-icon.svg";
import { managerData, nationalAverageData, yearLabels, managerQuarterData, nationalAverageQuarterData, quarterLabels } from "./mockData";

export default class Dashboard extends Component {
   state = {
      data: this.props.tempToday,
      average: this.props.tempYesterday,
      labels: yearLabels
   }

   constructor(props) {
      super(props);

      console.log(this.props)
   }

   componentDidMount() {
      console.log('tempToday');
      console.log(this.props.tempToday);
   }



   handleButtonClick = e => {
      const { value } = e.target;
      const isAnnual = value === "annual";

      const newData = isAnnual ? this.props.tempToday : this.props.humToday;
      const newLabels = isAnnual ? yearLabels : yearLabels;
      const newAverage = isAnnual ? this.props.tempYesterday : this.props.humYesterday;

      this.setState({
         data: newData,
         average: newAverage,
         labels: newLabels
      })
   }

   render() {
      const { data, average, labels } = this.state;
      return (
         <div className={classes.chartcontainer}>
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