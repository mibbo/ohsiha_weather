import React from 'react';
import DayCard from './DayCard';


class WeekContainer extends React.Component {
   state = {
      fullData: [],
      dailyData: [],
      userZip: this.props.zip,
      error: ''
   }
   constructor(props) { // tällä zip-zip toimiin
      super(props);
      // console.log(this.props)
      // this.setState({ zip: this.props.zip });
   }

   componentDidUpdate = () => {
      if (this.state.dailyData !== prevState.dailyData) {
         console.log('Dailycards update');
      }
   }

   componentDidMount = () => {
      // this.setState({ zip: this.props.zip });
      // console.log('FETCH ZIPPI');
      // console.log(this.state.zip);
      // console.log(this.props.zip);
      console.log('------zippiii-----');

      const storagezip = localStorage.localZip
      console.log(this.state.userZip);
      console.log(storagezip);



      const zip = localStorage.localZip
      const country = 'fi';
      // build api URL with user zip and api key
      const baseURL = 'https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/forecast?zip=' + zip + ',' + country;
      const apiId = '&appid=5146e8a2b64730def76488283a5ec4f0&units=metric';
      const weatherURL = baseURL + apiId;

      // const weatherURL =
      //    'https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/forecast?q=Tampere&units=metric&appid=5146e8a2b64730def76488283a5ec4f0'

      const getQuotes = () => {
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
               this.forceUpdate()
            })
      };
      // fetch data when component mounts
      getQuotes();
      // fetches data every hour
      this._interval = window.setInterval(getQuotes, 3600000);

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