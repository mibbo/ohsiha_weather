import React, { Component, Fragment } from 'react'
import { getWeather, getRoomTemp, getRoomTempHistory, getProfile, getUserZip } from './UserFunctions'

import WeekContainer from './WeekContainer';
import Dashboard from './Dashboard';

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
         humYesterday: []
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


            var dates = res.data.map(list => {
               return list.Date.split(" ")[1]
            })
            // temperature yesterday(0-23) and today(23->)
            var temp = res.data.map(list => {
               return list.Temp
            })
            // humidity yesterday(0-23) and today(23->)
            var hum = res.data.map(list => {
               return list.Hum
            })

            //dates x-axis (00:00-23:00)
            var dates = dates.splice(0, 24);
            // temperature y-axis
            var tempYesterday = temp.splice(0, 24);
            var tempToday = temp.splice(23, temp.length);
            // humiditys y-axis
            var humYesterday = hum.splice(0, 24);
            var humToday = hum.splice(24, temp.length);

            // console.log(dates);
            // console.log(temp);
            // console.log(hum);

            // console.log(datesToday);
            // console.log(datesYesterday);
            // console.log(tempToday);
            // console.log(atempYesterday);
            // console.log(humToday);
            // console.log(humYesterday);





            // const tempToday = [
            //    1000, 3706, 2850, 4005, 3750, 2912, 3200, 3645, 4205, 3211, 3354, 1000
            // ]

            // const tempYesterday = [
            //    4010, 3600, 2900, 3550, 3800, 2900, 3000, 3500, 4000, 3700, 3550, 3800, 4800, 3800, 3800, 3800, 3800
            // ]

            // const humToday = [
            //    600, 400, 600, 550, 700, 500, 600, 700, 500, 550, 600, 700
            // ]

            // const humYesterday = [
            //    500, 390, 670, 600, 780, 440, 600, 680, 550, 475, 700, 795, 680, 550, 475, 700, 795, 680, 550, 475, 700, 795
            // ]

            //TODO: Muuta kaikki neljä listaa data yhteen muuttujaan

            // const datesTemps = [
            //    { data: [] },
            // ];

            // let temp = res.data.map(obj => {
            //    let rObj = {}
            //    rObj = { x: obj.Date, y: obj.Temp }
            //    return rObj
            // })
            // datesTemps[0].values = temp;

            this.setState({
               roomHistoryData: res.data,
               // roomHistoryData: datesTemps
               tempToday: temp,
               tempYesterday: tempYesterday,
               humToday: hum,
               humYesterday: humYesterday
            })
         })
         // kertoo milloin on hakenut datan ja asettaa loading false -> 
         .finally(() => (
            console.log('ei lattaa ennää'),
            this.setState({
               loading: false
            })));
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
      const { temperature, location, zip, country, feelsLike, icon, roomTemperature, roomHumidity, roomHistoryData, loading, error } = this.state
      // const example = [
      //    { key: 'Group 1', values: [{ x: 'A', y: '1' }, { x: 'B', y: '2' }, { x: 'C', y: '3' }, { x: 'D', y: '4' }] },
      // ];
      // console.log(roomHistoryData);
      // console.log(example);

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
      )
   }
}

export default Landing
