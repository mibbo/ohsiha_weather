import axios from 'axios'

export const register = newUser => {
   return axios
      //sends the body data to backend
      .post('api/users/register', {
         username: newUser.username,
         password: newUser.password
      })
      .then(response => {
         console.log(response);
         if (response.data.status === 'Registered!') {
            return 'success';
         } else if (response.data.error === 'User already exists') {
            return 'User already exists'
         } else {
            return 'error'
         }
      })
}

export const login = user => {
   return axios
      .post('api/users/login', {
         username: user.username,
         password: user.password
      })
      .then(response => {
         console.log(response);
         if (response.data.error) {
            return response.data.error
         } else {
            localStorage.setItem('usertoken', response.data)
            return response.data
         }
      })
      .catch(err => {
         console.log(err)
      })
}

export const getProfile = token => {
   return axios
      .get('api/users/profile', {
         headers: { Authorization: ` ${token}` }
      })
      .then(response => {
         console.log(response)
         console.log(response.data);
         return response.data
      })
      .catch(err => {
         console.log(err)
      })
}

export const changeUserData = data => {
   console.log('changeUserData');
   return axios
      .post('api/users/changeUserData', {
         username: data.username,
         zip: data.zip
      })
      .then(response => {
         if (response.status === 200) {
            console.log(response.data);
            // palauttaa zip koodin stringinä
            return response.data;
         }
      })
      .catch(err => {
         console.log(err)
      })
}

export const getUserZip = data => {
   console.log('getWeather');
   return axios
      //lähettää backendiin usernamen
      .get('api/users/getUserZip', {
         headers: { username: ` ${data}` }
      })
      .then(response => {
         if (response.status === 200) {
            console.log(response.data);
            // palauttaa zip koodin stringinä
            return response.data;
         }
      })
      .catch(err => {
         console.log(err)
      })
}


export const getWeather = data => {
   console.log('getWeather');
   return axios
      //saa tarvittavat datat json muodossa
      .get('api/weather/zipWeather', {
         headers: { zipcode: ` ${data}` }
      })
      .then(response => {
         if (response.status === 200) {
            return response;
         }
      })
      .catch(err => {
         console.log(err)
      })
}

export const getRoomTemp = data => {
   return axios
      //saa tarvittavat datat json muodossa
      .get('api/weather/roomTemp', {
         headers: { sensorID: ` ${data}` }
      })
      .then(response => {
         if (response === null) { return ''; } //testaa vielä mitä pitäisi palauttaa jos liikaa requesteja kuukauden aikana
         if (response.status === 200) {
            return response;
         }
      })
      .catch(err => {
         console.log(err)
      })
}

export const getRoomTempHistory = data => {
   return axios
      //saa tarvittavat datat json muodossa
      .get('api/weather/roomTempHistory', {
         headers: { sensorID: ` ${data}` }
      })
      .then(response => {
         if (response.status === 200) {
            return response;
         }
      })
      .catch(err => {
         console.log(err)
      })
}
