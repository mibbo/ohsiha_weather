import React, { Component } from 'react'
import { getWeather } from './UserFunctions'


class Landing extends Component {
   constructor() {
      super()
      this.state = {
         username: '',
         error: ''
      }
   }

   componentDidMount() {
      console.log('componentDidMount');
      getWeather('33720')
         .then(data => {
            console.log('then data');

         })
   }


   render() {
      return (
         <div className="cards" >
            <section class="card card--weather">
               <header>
                  <h1 className="text-center">Weather</h1>
               </header>
               <ul>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
               </ul>
               <button></button>
            </section>
            <section class="card card--egain">
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
