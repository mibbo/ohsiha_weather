import React, { Component } from 'react';
import classes from "./Chart.module.css";
import HistoryChart from './HistoryChart';
import { getRoomTempHistory } from './UserFunctions'
import { set } from 'mongoose';


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

   componentDidMount = () => {
      //kokeile myös handleButtonClick() 


      // this._interval = window.setInterval(this.handleButtonClick.bind(this, this.state.info), 10000); //3600000 900000
   }

   // componentDidUpdate(prevProps, prevState) {
   //    if (this.state.todayData !== prevState.todayData) {
   //       console.log('historyChart update');
   //    }
   // }

   // static getDerivedStateFromProps(nextProps, prevState) {

   //    if (nextProps.tempToday !== prevState.todayData) {
   //       return { todayData: nextProps.tempToday };
   //    }
   //    else return null;
   // }

   componentDidUpdate(prevProps, prevState) {
      if (prevProps.tempToday !== this.state.todayData) {
         //Perform some operation here
         console.log('dashboardi sai jotai kamaa');
         console.log(prevProps.tempToday);
         this.setState({
            todayData: prevProps.tempToday,
            yesterdayData: prevProps.tempYesterday
         })


         //ei toiminu perkele tai vois toimia nyt kun vaihdoin this.state.todayDataksi


         // getRoomTempHistory('40020853')
         //    .then(res => {
         //       if (res === undefined || res.data === null) { // !res
         //          this.setState({ error: 'error2 while fetching apartment temperature data' })
         //          console.log(this.state.error);
         //          return;
         //       }
         //       // parse data to temperature and humidity lists for the chart
         //       var tempToday = res.data.map(list => {
         //          return list.Temp
         //       })
         //       var humToday = res.data.map(list => {
         //          return list.Hum
         //       })
         //       var tempYesterday = tempToday.splice(0, 24);
         //       var humYesterday = humToday.splice(0, 24);

         //       if (this.state.info === "Temperature °C") {
         //          this.setState({
         //             todayData: tempToday,
         //             yesterdayData: tempYesterday
         //          })
         //       } else {
         //          this.setState({
         //             todayData: humToday,
         //             yesterdayData: humYesterday
         //          })
         //       }
         //    })

      }
   }



   // Vaihtaa data käyttäjän painaessa nappia
   handleButtonClick = e => {
      console.log('------------------update chart--------------------');

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
                  value="yesterday"
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