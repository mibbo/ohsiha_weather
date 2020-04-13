import React, { Component } from 'react'
import { getWeather, getEgain } from './UserFunctions'


class Landing extends Component {
   constructor() {
      super()
      this.state = {
         location: '',
         temperature: '',
         feelsLike: '',
         roomTemperature: '',
         roomHumidity: '',
         error: ''
      }
      this.onChange = this.onChange.bind(this)
   }

   onChange(e) {
      this.setState({ [e.target.name]: e.target.value })
      this.setState({ error: '' })
   }

   componentDidMount() {
      console.log('componentDidMount');
      getWeather('33720')
         .then(res => {
            console.log('then data');
            if (!res) {
               this.setState({ error: 'error while fetching data' })
               return;
            }
            console.log(res);
            console.log(res.data.name);

            this.setState({
               location: res.data.name,
               temperature: res.data.main.temp,
               feelsLike: res.data.main.feels_like
            })
         })

      getEgain('40020853')
         .then(res => {
            console.log('frontend egain');
            if (!res) {
               this.setState({ error: 'error while fetching data' })
               console.log(this.state.error);
               return;
            }
            console.log(res);

            this.setState({
               roomTemperature: res.data.Temp,
               roomHumidity: res.data.Humidity
            })
         })
   }


   render() {
      const { temperature, location, feelsLike, roomTemperature, roomHumidity, error } = this.state
      return (
         <div className="cards" >
            <section className="card card--weather">
               <header>
                  <h1 className="text-center">Weather</h1>
               </header>
               <ul>
                  <li>{location}</li>
                  <li>Temp: {temperature} °C</li>
                  <li>Feels like: {feelsLike}°C</li>
               </ul>
               <button></button>
            </section>
            <section className="card card--egain">
               <header>
                  <h1 className="text-center">egain</h1>
               </header>
               <ul>
                  <li>Apartment temperature: {roomTemperature} °C</li>
                  <li>Apartment humidity: {roomHumidity} % </li>
               </ul>
               <button></button>
            </section>
         </div>
      )
   }
}

export default Landing
