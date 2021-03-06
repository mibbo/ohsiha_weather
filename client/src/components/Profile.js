import React, { Component } from 'react'
//import jwt_decode from 'jwt-decode'
import { getProfile, changeUserData, getUserZip } from './UserFunctions'

import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '../theme';
import { GlobalStyles } from '../global';

class Profile extends Component {
   constructor() {
      super()
      this.state = {
         username: '',
         location: '',
         staticZip: '',
         zip: '',
         theme: '',
         error: ''
      }

      this.onChange = this.onChange.bind(this)
      this.onSubmit = this.onSubmit.bind(this)
   }

   onChange(e) {
      this.setState({ [e.target.name]: e.target.value })
      this.setState({ error: '' })
   }
   onSubmit(e) {
      e.preventDefault()
      console.log('submit state: ');
      this.setState({
         staticZip: this.state.zip
      })
      localStorage.setItem('localZip', this.state.zip)


      console.log(this.state);

      const data = {
         username: this.state.username,
         zip: this.state.zip
      }

      changeUserData(data).then(status => {
         if (status === 'Wrong password') {
            this.setState({ error: status })
         } else if (status === 'User does not exist') {
            this.setState({ error: status })
         } else {
            //this.props.history.push(`/profile`)
         }
      })

      getUserZip(this.state.username).then(status => {
         var userZip = status
         this.setState({
            staticZip: userZip
         })
      })

   }

   // sivulle tullessa hakee tietokannasta käyttäjän nimen sekä zip koodin 
   componentDidMount() {
      this.setState({ theme: localStorage.theme })
      const token = localStorage.usertoken
      // const decoded = jwt_decode(token)
      // this.setState({
      // username: decoded.username
      getProfile(token).then(res => {
         this.setState({
            username: res.username
         })
         getUserZip(res.username).then(status => {
            var userZip = status
            this.setState({
               staticZip: userZip
            })
            localStorage.setItem('localZip', userZip)
         })
      })



   }

   render() {
      const { username, location, staticZip, theme, error } = this.state
      return (
         <div className="container" >
            <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
               <>
                  <GlobalStyles />
               </>
            </ThemeProvider>
            <div className="jumbotron mt-5">
               <div className="col-sm-8 mx-auto">
                  <h1 className="text-center">PROFILE</h1>
               </div>
               <form noValidate onSubmit={this.onSubmit}>
                  <table className="table col-md-6 mx-auto">
                     <tbody>
                        <tr>
                           <td>Username</td>
                           <td>{username}</td>
                        </tr>
                        <tr>
                           <td>Location</td>
                           <td>{location}</td>
                        </tr>
                        <tr>
                           <td>Zip-code</td>
                           <td>{staticZip}</td>
                        </tr>
                        <div>
                           <input
                              id="change-location-input"
                              type="text"
                              className="form-control"
                              name="zip" required
                              minLength="5"
                              maxLength="5"
                              placeholder="Enter zip code"
                              value={this.state.zip}
                              onChange={this.onChange}
                           />
                        </div>
                        <button
                           id="zip-button"
                           type="submit"
                           value="Submit"
                           className="btn btn-lg btn-primary btn-block">
                           Change zip
                     </button>
                        <span>
                           {error}
                        </span>
                     </tbody>
                  </table>
               </form>

            </div>
         </div>
      )
   }
}

export default Profile
