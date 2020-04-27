import React from 'react';
import DayCard from './DayCard';


class WeekContainer extends React.Component {
   state = {
      fullData: [],
      dailyData: [],
      zip: '',
   }
   constructor(props) { // tällä zip-zip toimiin
      super(props);
      console.log(this.props)
   }

   componentDidMount = () => {
      this.setState({ zip: this.props.zip });

      // const zip = this.props.zip;
      // const country = 'fi';
      // // build api URL with user zip and api key
      // const baseURL = 'http://api.openweathermap.org/data/2.5/forecast?zip=' + zip + ',' + country;
      // const apiId = '&appid=0cb470bd4094e6bdd06e699372db26a4&units=metric';
      // const weatherURL = baseURL + apiId;

      const weatherURL =
         'http://api.openweathermap.org/data/2.5/forecast?q=Tampere&units=metric&appid=0cb470bd4094e6bdd06e699372db26a4'

      const getQuotes = () => {
         fetch(weatherURL)
            .then(res => res.json())
            .then(data => {
               const dailyData = data.list.filter(reading => reading.dt_txt.includes("12:00:00"))
               this.setState({
                  fullData: data.list,
                  dailyData: dailyData
               }, () => console.log(this.state))
            })
      };
      // fetch data when component mounts
      getQuotes();
      //fetches data every 6 hours
      this._interval = window.setInterval(getQuotes, 21600000);
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
            <h4>{this.props.zip}</h4>
            <div className="row justify-content-center">
               {this.formatDayCards()}
            </div>
         </div>
      )
   }
}

export default WeekContainer;