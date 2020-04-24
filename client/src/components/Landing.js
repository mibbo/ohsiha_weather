import React, { Component, Fragment, useEffect, useState } from 'react'
import { getWeather, getRoomTemp, getRoomTempHistory, getProfile, getUserZip } from './UserFunctions'

import WeekContainer from './WeekContainer';
import Dashboard from './Dashboard';

import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '../theme';
import { GlobalStyles } from '../global';



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
         chartData: [],
         loading: true,
         error: '',
         tempToday: [],
         tempYesterday: [],
         humToday: [],
         humYesterday: [],
         theme: ''
      }
      this.onChange = this.onChange.bind(this)
   }

   onChange(e) {
      this.setState({ [e.target.name]: e.target.value })
      this.setState({ error: '' })
   }

   componentDidMount() {
      this.setState({ theme: localStorage.theme })


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

            this.setState({
               location: res.data.name,
               country: res.data.sys.country,
               temperature: res.data.main.temp,
               feelsLike: res.data.main.feels_like,
               icon: res.data.weather[0].icon
            })
         })
      }



      // getRoomTemp('40020853')
      //    .then(res => {
      //       if (res === undefined || res.data === null) { // !res
      //          this.setState({ error: 'error while fetching apartment temperature data' })
      //          console.log(this.state.error);
      //          return;
      //       }
      //       console.log(res);

      //       this.setState({
      //          roomTemperature: res.data.Temp,
      //          roomHumidity: res.data.Humidity
      //       })
      //    })

      getRoomTempHistory('40020853')
         .then(res => {
            if (res === undefined || res.data === null) { // !res
               this.setState({ error: 'error2 while fetching apartment temperature data' })
               console.log(this.state.error);
               return;
            }


            // parse data to temperature and humidity lists for the chart
            var tempToday = res.data.map(list => {
               return list.Temp
            })
            var humToday = res.data.map(list => {
               return list.Hum
            })
            var tempYesterday = tempToday.splice(0, 24);
            var humYesterday = humToday.splice(0, 24);

            this.setState({
               roomHistoryData: res.data,
               tempToday: tempToday,
               tempYesterday: tempYesterday,
               humToday: humToday,
               humYesterday: humYesterday
            })
         })
         // kertoo milloin on hakenut datan ja asettaa loading false -> 
         .finally(() => (
            this.setState({
               loading: false
            })));




   }

   toggleTheme = () => {
      // if the theme is not light, then set it to dark
      if (this.state.theme === 'light') {
         localStorage.setItem('theme', 'dark')
         this.setState({ theme: 'dark' })
         // otherwise, it should be light
      } else {
         localStorage.setItem('theme', 'light')
         this.setState({ theme: 'light' })
      }
   }



   //renderöi Dashboardin ja antaa tarvittavan datan mappina
   renderDashboard = () => {
      console.log('MANAGERDATA');
      console.log(this.state.tempToday[0]);

      return <Dashboard
         tempToday={this.state.tempToday}
         tempYesterday={this.state.tempYesterday}
         humToday={this.state.humToday}
         humYesterday={this.state.humYesterday} />
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
      ));
      return mapRows;
   };


   render() {
      const { temperature, location, zip, country, feelsLike, icon, roomTemperature, roomHumidity, loading, theme, error } = this.state

      return (
         <div className="darkLightMode" >
            <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
               <>
                  <GlobalStyles />
                  <button onClick={this.toggleTheme}>Dark/Light</button>
               </>
            </ThemeProvider>
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
                     <li id='time'>lisää aika tähän </li>

                  </ul>
               </section >
               <section className="card card--history">
                  <header>
                     <h1 className="text-center">Apartment</h1>
                  </header>
                  <div className="row justify-content-center">
                     {loading ? null : this.renderDashboard()}
                  </div>
               </section >
            </div >
         </div>

      )
   }
}

export default Landing
