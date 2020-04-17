//const Weather = require('../models/weather');
const axios = require('axios');
const unirest = require('unirest');
var request = require('request');


module.exports = {

   async zip(request, response) {
      const zip = request.headers['zipcode'];
      const country = 'fi';
      // build api URL with user zip
      const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=' + zip + ',' + country;
      // My API key
      const apiId = '&appid=0cb470bd4094e6bdd06e699372db26a4&units=metric';
      const apiUrl = baseURL + apiId;

      axios.get(apiUrl)
         .then(res => {
            // console.log(res.data);
            response.json(res.data)
         })
   },

   async roomTemp(request, response) {
      console.log(request.headers['sensorID']);
      unirest('POST', 'http://install.egain.se/Home/CheckInstalled')
         .headers({
            'Cookie': 'ASP.NET_SessionId=4ihlu51aarix1yg2ttlwxpxv; activationInfo=code=&email=&ip=&mobile=&name=&installed=true&s2015=false&is912=false; sensorInfo=sensorinfo',
            'Origin': 'http://install.egain.se',
            'Accept-Encoding': 'gzip, deflate',
            'Accept-Language': 'en-US,en;q=0.9,fi;q=0.8',
            'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Accept': '*/*',
            'Referer': 'http://install.egain.se/?gid=63558404-EDD4-49DD-AE9F-5BFB5FD5BC4D',
            'X-Requested-With': 'XMLHttpRequest',
            'Connection': 'keep-alive'
         })
         .send("guid=63558404-EDD4-49DD-AE9F-5BFB5FD5BC4D")
         .end(function (res) {
            if (res.error) throw new Error(res.error);
            var data = JSON.parse(res.raw_body);
            console.log(JSON.stringify(data.SensorInfo, undefined, 2));
            response.json(data.SensorInfo)
         });

   },

   async roomTempHistory(req, response) {
      var options = {
         'method': 'POST',
         'url': 'http://install.egain.se/Home/ListSensorValues',
         'headers': {
            'Accept': '*/*',
            'Origin': 'http://install.egain.se',
            'X-Requested-With': 'XMLHttpRequest',
            'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
         },
         form: {
            'daysAgo': '1',
            'guid': '63558404-EDD4-49DD-AE9F-5BFB5FD5BC4D'
         }
      };
      var req = request(options, function (error, res) {
         if (error) throw new Error(error);
         var data = JSON.parse(res.body);
         response.json(data)
         console.log(data);

      });
   }
}
