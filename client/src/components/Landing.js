import React, { Component } from 'react'
import { getWeather } from './UserFunctions'


class Landing extends Component {
   constructor() {
      super()
      this.state = {
         location: '',
         temperature: '',
         feelsLike: '',
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
               this.setState({ error: 'error when fetching data' })
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
   }


   render() {
      const { temperature, location, feelsLike, error } = this.state
      return (
         <div className="cards" >
            <section className="card card--weather">
               <header>
                  <h1 className="text-center">Weather</h1>
               </header>
               <ul>
                  <li>{location}</li>
                  <li>temp: {temperature} °C</li>
                  <li>feels like: {feelsLike} °C</li>
                  <li></li>
                  <li></li>
                  <li></li>
               </ul>
               <button></button>
            </section>
            <section className="card card--egain">
               <header>
                  <h1 className="text-center">egain</h1>
               </header>
               <ul>
                  <li></li>
                  <li></li>
                  <li></li>
               </ul>
               <button></button>
            </section>
         </div>
      )
   }
}

export default Landing
