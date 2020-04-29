import React from 'react';
import DayCard from './DayCard';


class WeekContainer extends React.Component {
   state = {
      fullData: [],
      dailyData: [],
      userZip: this.props.zip,
      error: ''
   }
   constructor(props) {
      super(props);
   }

   componentDidMount = () => {
      const zip = localStorage.localZip
      const country = 'fi';
      // build api URL with user zip and api key
      const baseURL = 'https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/forecast?zip=' + zip + ',' + country;
      const apiId = '&appid=5146e8a2b64730def76488283a5ec4f0&units=metric';
      const weatherURL = baseURL + apiId;

      const fetchWeather = () => {
         fetch(weatherURL)
            .then(res => res.json())
            .then(data => {
               if (data.list !== undefined) {
                  const dailyData = data.list.filter(reading => reading.dt_txt.includes("12:00:00"))
                  this.setState({
                     fullData: data.list,
                     dailyData: dailyData
                  }, () => console.log(this.state))
               } else {
                  this.setState({ error: 'Incorrect postal code' })
               }
               this.formatDayCards()
            })
      };
      // fetch data when component mounts
      fetchWeather();
      // fetches data every hour
      this._interval = window.setInterval(fetchWeather, 3600000);
   }

   componentWillUnmount() {
      this._interval && window.clearInterval(this._interval);
   }

   formatDayCards = () => {
      return this.state.dailyData.map((reading, index) => <DayCard reading={reading} key={index} />)
   }

   render() {
      return (
         <div className="container">
            <span>
               {this.state.error}
            </span>
            <div className="row justify-content-center">
               {this.formatDayCards()}
            </div>
         </div>
      )
   }
}

export default WeekContainer;