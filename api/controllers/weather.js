//const Weather = require('../models/weather');
const axios = require('axios');

module.exports = {

   async show(request, response) {
      console.log('zipcode: ' + request.headers['zipcode']);

      const zip = request.headers['zipcode'];
      const country = 'fi';
      // build api URL with user zip
      const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=' + zip + ',' + country;
      // My API key
      const apiId = '&appid=0cb470bd4094e6bdd06e699372db26a4&units=metric';

      const apiUrl = baseURL + apiId;

      axios.get(apiUrl)
         .then(res => {
            console.log(res.data);
            response.json(res.data)
         })
   }
}
