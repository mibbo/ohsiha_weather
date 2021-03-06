import axios from 'axios'

export const register = newUser => {
   return axios
      //sends the body data to backend
      .post('users/register', {
         username: newUser.username,
         password: newUser.password
      })
      .then(response => {
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
      .post('users/login', {
         username: user.username,
         password: user.password
      })
      .then(response => {
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
      .get('users/profile', {
         headers: { Authorization: ` ${token}` }
      })
      .then(response => {
         return response.data
      })
      .catch(err => {
         console.log(err)
      })
}

export const changeUserData = data => {
   return axios
      .post('users/changeUserData', {
         username: data.username,
         zip: data.zip
      })
      .then(response => {
         if (response.status === 200) {
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
      .get('users/getUserZip', {
         headers: { username: ` ${data}` }
      })
      .then(response => {
         if (response.status === 200) {
            // palauttaa zip koodin stringinä
            return response.data;
         }
      })
      .catch(err => {
         console.log(err)
      })
}


export const getWeather = data => {
   return axios
      //saa tarvittavat datat json muodossa
      .get('weather/zipWeather', {
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
      .get('weather/roomTemp', {
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
      .get('weather/roomTempHistory', {
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
