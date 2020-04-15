import React from 'react';

var moment = require('moment');

const DayCard = ({ reading }) => {
   let newDate = new Date();
   const weekday = reading.dt * 1000
   newDate.setTime(weekday)
   const icon = reading.weather[0].icon


   return (
      <div className="col-sm-2">

         <section className="card card--day">
            <header>
               <h4 className="text-center">{moment(newDate).format('dddd')}</h4>
            </header>
            <ul>
               <li id="li1">{moment(newDate).format('MMMM Do, h:mm a')}</li>
               <li id="li2">{Math.round(reading.main.temp)} °C</li>
               <li><img src={'http://openweathermap.org/img/wn/' + icon + '@2x.png'} /></li>
            </ul>
         </section >
      </div>

   )
}

export default DayCard;