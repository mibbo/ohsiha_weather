import React from 'react';
import DayCard from './DayCard';


class WeekContainer extends React.Component {
   state = {
      fullData: [],
      dailyData: [],
      location: ''

   }

   componentDidMount = () => {
      this.setState({ location: this.props.location });
      console.log(this.props.location);   //EI TOMI !=?!?!

      const weatherURL =
         `http://api.openweathermap.org/data/2.5/forecast?q=Tampere&units=metric&appid=0cb470bd4094e6bdd06e699372db26a4`

      // let url = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + this.state.latitude + '&lon=' + this.state.longitude + '&units=metric&appid=0cb470bd4094e6bdd06e699372db26a4';

      fetch(weatherURL)
         .then(res => res.json())
         .then(data => {
            const dailyData = data.list.filter(reading => reading.dt_txt.includes("12:00:00"))
            this.setState({
               fullData: data.list,
               dailyData: dailyData
            }, () => console.log(this.state))
         })
   }

   formatDayCards = () => {
      return this.state.dailyData.map((reading, index) => <DayCard reading={reading} key={index} />)
   }

   render() {
      return (
         <div className="container">
            <div className="row justify-content-center">
               {this.formatDayCards()}
            </div>
         </div>
      )
   }
}

export default WeekContainer;