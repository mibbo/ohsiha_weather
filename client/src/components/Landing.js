import React, { Component, Fragment } from 'react'
import { getWeather, getRoomTemp, getRoomTempHistory, getProfile } from './UserFunctions'

import WeekContainer from './WeekContainer';

class Landing extends Component {
   constructor() {
      super()
      this.state = {
         location: '',
         country: '',
         temperature: '',
         feelsLike: '',
         roomTemperature: '',
         roomHumidity: '',
         roomHistoryData: [],
         error: ''
      }
      this.onChange = this.onChange.bind(this)
   }

   onChange(e) {
      this.setState({ [e.target.name]: e.target.value })
      this.setState({ error: '' })
   }

   componentDidMount() {
      getWeather('33720')
         .then(res => {
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
               feelsLike: res.data.main.feels_like
            })
         })

      // const token = localStorage.usertoken            //tokenin säätö debugaus
      // console.log(token);

      // getProfile(token)
      //    .then(res => {
      //       console.log("landing tokenin sisältö:");
      //       console.log(res);
      //    })

      getRoomTemp('40020853')
         .then(res => {
            if (res.data === null) { // !res
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
            if (res.data === null) { // !res
               this.setState({ error: 'error while fetching apartment temperature history data' })
               console.log(this.state.error);
               return;
            }
            this.setState({
               roomHistoryData: res.data
            })
            console.log(" ");
            console.log("modattu response");
            console.log(this.state.roomHistoryData);
         })
   }

   renderItems = () => {
      const data = this.state.roomHistoryData;

      const mapRows = data.map((item, index) => (
         <Fragment key={item.id}>
            <li>
               {/* Passing unique value to 'key' prop, eases process for virtual DOM to remove specific element and update HTML tree  */}
               <span>{item.Date}</span>
               <span> - {item.Temp}°C</span>
               <span> - {item.Hum}%</span>
            </li>
         </Fragment>
      ));
      return mapRows;
   };


   render() {
      const { temperature, location, country, feelsLike, roomTemperature, roomHumidity, roomHistoryData, error } = this.state
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
                  <li id='location'>{location}, {country}</li>
                  <li id='temp'>{Math.round(temperature)}<sup>°C</sup></li>
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
                  <li>Temperature: {roomTemperature} °C</li>
                  <li>Humidity: {roomHumidity} % </li>
               </ul>
               <h4 className="text-center">History</h4>
               <ul>{this.renderItems()}</ul>
            </section >
         </div >
      )
   }
}

export default Landing
