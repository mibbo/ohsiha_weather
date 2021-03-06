import React, { Component, Fragment } from 'react'
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


      const fetchData = () => {
         //jos käyttäjä kirjautunut niin hakee käyttäjäkohtaisen säädatan
         if (localStorage.usertoken) {
            getProfile(token).then(res => {
               if (res === undefined) { // !res
                  this.setState({ error: 'login token has expired' })
                  console.log(this.state.error);
                  return;
               } else {
                  this.setState({
                     username: res.username
                  })
               }
               // hakee backendin kautta tietokannasta käyttäjän postiosoitteen
               getUserZip(res.username).then(status => {
                  var userZip = status
                  this.setState({
                     zip: userZip
                  })
                  localStorage.setItem('localZip', userZip)

                  getWeather(userZip).then(res => {
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
               if (!res) {
                  this.setState({ error: 'error while fetching weather data' })
                  return;
               }

               this.setState({
                  location: res.data.name,
                  country: res.data.sys.country,
                  temperature: res.data.main.temp,
                  feelsLike: res.data.main.feels_like,
                  icon: res.data.weather[0].icon,
                  zip: '33720'
               })
               localStorage.setItem('localZip', '33720')

            })
         }

         // disabled because of request limit in the API
         getRoomTemp('40020853')
            .then(res => {
               if (res === undefined || res.data === null) { // !res
                  this.setState({ error: 'error: monthly API-requests exceeded' })
                  console.log(this.state.error);
                  return;
               }

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
               this.setState({
                  loading: true
               })
               console.log('loading: true');
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
               this.renderDashboard()

            })
            // kertoo milloin on hakenut datan ja asettaa loading false -> 
            .finally(() => (
               console.log('loading: false'),
               this.setState({
                  loading: false
               },
                  // this.renderDashboard()
               )));

      }

      fetchData();
      //fetches data every 15min
      this._interval = window.setInterval(fetchData, 900000);

   }
   componentWillUnmount() {
      this._interval && window.clearInterval(this._interval);
   }

   toggleTheme = () => {
      // if theme is light -> set theme to dark
      if (this.state.theme === 'light') {
         localStorage.setItem('theme', 'dark')
         this.setState({ theme: 'dark' })
         // otherwise, sets it to light
      } else {
         localStorage.setItem('theme', 'light')
         this.setState({ theme: 'light' })
      }
   }



   //renderöi Dashboardin ja antaa tarvittavan datan mappina
   renderDashboard = () => {
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
                  <ul>
                     <li id='location'>{location}, {zip}, {country}</li>
                     <li id='temp'><sup><img src={'http://openweathermap.org/img/wn/' + icon + '@2x.png'} /></sup>{Math.round(temperature)}<sup>°C</sup></li>
                     <li id='feels'>Feels like {Math.round(feelsLike)} °C</li>
                     <li></li>
                     <li id="line"></li>
                     <li id="daily">Daily</li>

                  </ul>
                  <div className="App">
                     <WeekContainer zip={zip} />
                  </div>
               </section>
               <section className="card card--egain">
                  <header>
                     <h1 className="text-center">Apartment</h1>
                  </header>
                  <ul>
                     <li id='temp'>{roomTemperature}<sup>°C</sup></li>
                     <li id='feels'>Humidity {roomHumidity} % </li>
                     {/* <li id='time'>lisää aika tähän </li> */}

                  </ul>
                  <span>
                     {error}
                  </span>
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
