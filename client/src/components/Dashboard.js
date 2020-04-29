import React, { Component } from 'react';
import classes from "./Chart.module.css";
import HistoryChart from './HistoryChart';


export default class Dashboard extends Component {
   state = {
      todayData: this.props.tempToday,
      yesterdayData: this.props.tempYesterday,
      labels: ["00:00", "01:00", "04:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"],
      info: 'Temperature °C',
   }

   constructor(props) {
      super(props);
   }

   //hetkellisesti disabloitu, sillä kaataa kaataa backendin kun ohjelma on käynyt pitkään ??
   // componentDidUpdate(prevProps, prevState) {
   //    if (prevProps.tempToday !== this.state.todayData) {
   //       if (this.state.info === "Temperature °C") {
   //          this.setState({
   //             todayData: prevProps.tempToday,
   //             yesterdayData: prevProps.tempYesterday
   //          })
   //       } else {
   //          this.setState({
   //             todayData: prevProps.humToday,
   //             yesterdayData: prevProps.humYesterday
   //          })
   //       }
   //    }
   // }



   // Vaihtaa data käyttäjän painaessa nappia
   handleButtonClick = e => {
      const { value } = e.target;
      const isAnnual = value === "Temperature °C";

      const newtodayData = isAnnual ? this.props.tempToday : this.props.humToday;
      const newyesterdayData = isAnnual ? this.props.tempYesterday : this.props.humYesterday;
      const newInfo = isAnnual ? 'Temperature °C' : 'Humidity %';

      this.setState({
         todayData: newtodayData,
         yesterdayData: newyesterdayData,
         info: newInfo
      })
   }


   componentWillUnmount() {
      this._interval && window.clearInterval(this._interval);
   }

   render() {
      const { todayData, yesterdayData, labels, info } = this.state;
      return (
         <div className={classes.chartcontainer}>
            <h4>{info}</h4>
            <div className={classes.buttonContainer}>
               <button
                  value="Temperature °C"
                  onClick={this.handleButtonClick}>
                  Temperature
               </button>
               <button
                  value="Humidity %"
                  onClick={this.handleButtonClick}>
                  Humidity
               </button>
            </div>
            <HistoryChart
               todayData={todayData}
               yesterdayData={yesterdayData}
               labels={labels} />
         </div>
      )
   }
}