import React, { Component, Fragment } from 'react'
import { getWeather, getRoomTemp, getRoomTempHistory } from './UserFunctions'


class Landing extends Component {
   constructor() {
      super()
      this.state = {
         location: '',
         temperature: '',
         feelsLike: '',
         roomTemperature: '',
         roomHumidity: '',
         roomHistoryData: [],
         userData: [
            { id: '1', name: 'Joe', user_type: 'Developer' },
            { id: '2', name: 'Hill', user_type: 'Designer' }
         ],
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

      getRoomTemp('40020853')
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

      getRoomTempHistory('40020853')
         .then(res => {
            if (!res) {
               this.setState({ error: 'error while fetching data' })
               console.log(this.state.error);
               return;
            }
            this.setState({
               roomHistoryData: res.data
            })
            console.log(" ");
            console.log("modattu response");
            console.log(this.state.roomHistoryData);
            console.log(this.state.userData);
         })
   }

   deleteUser = id => {
      // delete operation to remove item
   };

   renderItems = () => {
      const data = this.state.roomHistoryData;

      const mapRows = data.map((item, index) => (
         <Fragment key={item.id}>
            <li>
               {/* Passing unique value to 'key' prop, eases process for virtual DOM to remove specific element and update HTML tree  */}
               <span>{item.Date}</span>
               <span> - {item.Temp}°C</span>
               <span> - {item.Hum}%</span>

               {/* <button onClick={() => this.deleteUser(item.id)}>
                  Delete User
                  </button> */}
            </li>
         </Fragment>
      ));
      return mapRows;
   };


   render() {
      const { temperature, location, feelsLike, roomTemperature, roomHumidity, roomHistoryData, error } = this.state
      return (
         <div className="cards" >
            <section className="card card--weather">
               <header>
                  <h1 className="text-center">Weather</h1>
               </header>
               <ul>
                  <li>{location}</li>
                  <li>Temp: {temperature} °C</li>
                  <li>Feels like: {feelsLike} °C</li>
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

               <ul>{this.renderItems()}</ul>

               <button></button>
            </section >
         </div >
      )
   }
}

export default Landing
