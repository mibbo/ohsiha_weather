import React, { Component, Fragment } from 'react'
import { getWeather, getRoomTemp, getRoomTempHistory, getProfile, getUserZip } from './UserFunctions'

import WeekContainer from './WeekContainer';
import { AreaChart } from 'react-charts-d3';

class Landing extends Component {
   constructor() {
      super()
      this.state = {
         username: '',
         location: '',
         zip: '',
         country: '',
         temperature: '',
         feelsLike: '',
         icon: '',
         roomTemperature: '',
         roomHumidity: '',
         roomHistoryData: [],
         loading: true,
         error: ''
      }
      this.onChange = this.onChange.bind(this)
   }

   onChange(e) {
      this.setState({ [e.target.name]: e.target.value })
      this.setState({ error: '' })
   }

   componentDidMount() {
      const token = localStorage.usertoken

      //jos käyttäjä kirjautunut niin hakee käyttäjäkohtaisen säädatan
      if (localStorage.usertoken) {
         getProfile(token).then(res => {
            this.setState({
               username: res.username
            })
            getUserZip(res.username).then(status => {
               var userZip = status
               this.setState({
                  zip: userZip
               })
               getWeather(userZip).then(res => {
                  console.log('then data');
                  if (!res) {
                     this.setState({ error: 'error while fetching weather data' })
                     return;
                  }
                  this.setState({
                     location: res.data.name,
                     country: res.data.sys.country,
                     temperature: res.data.main.temp,
                     feelsLike: res.data.main.feels_like,
                     icon: res.data.weather[0].icon
                  })
               })

            })
         })
         //käyttjä ei ole kirjautunut -> hakee hervannan sään
      } else {
         getWeather('33720').then(res => {
            console.log('then data');
            if (!res) {
               this.setState({ error: 'error while fetching weather data' })
               return;
            }
            console.log(res);

            this.setState({
               location: res.data.name,
               country: res.data.sys.country,
               temperature: res.data.main.temp,
               feelsLike: res.data.main.feels_like,
               icon: res.data.weather[0].icon
            })
         })
      }



      getRoomTemp('40020853')
         .then(res => {
            if (res === undefined || res.data === null) { // !res
               this.setState({ error: 'error while fetching apartment temperature data' })
               console.log(this.state.error);
               return;
            }
            console.log(res);

            this.setState({
               roomTemperature: res.data.Temp,
               roomHumidity: res.data.Humidity
            })
         })

      getRoomTempHistory('40020853')
         .then(res => {
            if (res === undefined || res.data === null) { // !res
               this.setState({ error: 'error2 while fetching apartment temperature data' })
               console.log(this.state.error);
               return;
            }

            const datesTemps = [
               { key: 'Group 1', values: [] },
            ];

            let temp = res.data.map(obj => {
               let rObj = {}
               rObj = { x: obj.Date, y: obj.Temp }
               return rObj
            })
            datesTemps[0].values = temp;

            const example = [
               { key: 'Group 1', values: [{ x: 'A', y: '1' }, { x: 'B', y: '2' }, { x: 'C', y: '3' }, { x: 'D', y: '4' }] },
            ];
            console.log(datesTemps);
            console.log(example);

            this.setState({
               // roomHistoryData: res.data
               roomHistoryData: datesTemps
            })
         })
         .finally(() => (
            console.log('ei lattaa ennää'),
            this.setState({
               loading: false
            })));
   }


   renderItems = () => {
      const data = this.state.roomHistoryData;
      const mapRows = data.map((item, index) => (
         <Fragment key={item.id}>
            <li>
               <span>{item.Date}</span>
               <span> - {item.Temp}°C</span>
               <span> - {item.Hum}%</span>
            </li>
         </Fragment>

         // <AreaChart data={roomHistoryData} />

      ));
      return mapRows;
   };


   render() {
      const { temperature, location, zip, country, feelsLike, icon, roomTemperature, roomHumidity, roomHistoryData, loading, error } = this.state
      // const example = [
      //    { key: 'Group 1', values: [{ x: 'A', y: '1' }, { x: 'B', y: '2' }, { x: 'C', y: '3' }, { x: 'D', y: '4' }] },
      // ];
      // console.log(roomHistoryData);
      // console.log(example);

      const historyChart = <AreaChart data={this.state.roomHistoryData} />

      return (
         <div className="cards" >
            <section className="card card--weather">
               <header>
                  <h1 className="text-center">Weather</h1>
               </header>
               <span>
                  {error}
               </span>
               <ul>
                  <li id='location'>{location}, {zip}, {country}</li>
                  <li id='temp'><sup><img src={'http://openweathermap.org/img/wn/' + icon + '@2x.png'} /></sup>{Math.round(temperature)}<sup>°C</sup></li>
                  <li id='feels'>Feels like {Math.round(feelsLike)} °C</li>
                  <li></li>
                  <li id="line"></li>
                  <li id="daily">Daily</li>

               </ul>
               <div className="App">
                  <WeekContainer location={location} />
               </div>
            </section>
            <section className="card card--egain">
               <header>
                  <h1 className="text-center">Apartment</h1>
               </header>
               <ul>
                  <li id='temp'>{roomTemperature}<sup>°C</sup></li>
                  <li id='feels'>Humidity {roomHumidity} % </li>
               </ul>
               <h4 className="text-center">History</h4>
               <ul>{this.renderItems()}</ul>
            </section >
            <section className="card card--history">
               <header>
                  <h1 className="text-center">History</h1>
               </header>
               <div className="row justify-content-center">
                  {loading ? null : historyChart}
               </div>
            </section >
         </div >
      )
   }
}

export default Landing
