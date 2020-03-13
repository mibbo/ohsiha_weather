import React, { Component } from 'react'


class Landing extends Component {
   render() {
      return (
         <div className="cards">
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
