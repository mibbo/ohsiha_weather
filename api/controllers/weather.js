//const Weather = require('../models/weather');

module.exports = {

   async show(request, response) {

      console.log('show: ' + request.headers['zipcode']);

      const zip = '33720';
      const country = 'fi';
      // build api URL with user zip
      const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=${zip},${country}';
      // My API key
      const apiId = '&appid=0cb470bd4094e6bdd06e699372db26a4&units=metric';

      const userLocation = (url1, url2) => {
         let newUrl = url1 + url2,
         return newUrl;
      }

      const apiUrl = userLocation(baseURL, apiId);

      fetch(apiUrl)
         .then(res => res.json())
         .then(data => {
            console.log(data);
            res.send({ data });
         })
         .catch(err => {
            console.log(err);
            //res.redirect('/error');
         })
   }
}
