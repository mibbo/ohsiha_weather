import React, { Component } from 'react'
//import jwt_decode from 'jwt-decode'
import { getProfile, changeUserData } from './UserFunctions'

class Profile extends Component {
   constructor() {
      super()
      this.state = {
         username: '',
         location: '',
         staticZip: '',
         zip: '',
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
      console.log(this.state);

      this.setState({
         staticZip: this.state.zip
      })

      // TÄHÄN tarkistaa onko zippiä olemassa, jos ei niin ei vaihda sitä
      // samalla saa zipin vastaavan locaation


      //TODO
      //
      // lähetä uusi zip koodi (ja käyttäjätunnus?) backendiin, vaihda kyseisen käyttäjän zip koodi 
      // luultavasti pitää myös vaihtaa tokenista zip koodi, jotta se vaihtuu 
      // käyttäjän nykyiselle kirjautumissessiolle
      // changeUserData(user).then(status => {
      //    if (status === 'Wrong password') {
      //       this.setState({ error: status })
      //    } else if (status === 'User does not exist') {
      //       this.setState({ error: status })
      //    } else {
      //       //this.props.history.push(`/profile`)
      //    }
      // })
   }

   componentDidMount() {
      const token = localStorage.usertoken
      // const decoded = jwt_decode(token)
      // this.setState({
      // username: decoded.username
      getProfile(token).then(res => {
         console.log("tokenin sisältö:");           //tokenin tarkistus debugaus  
         console.log(res);

         this.setState({
            username: res.username
         })
      })


   }

   render() {
      const { username, location, staticZip, zip, error } = this.state
      return (
         <div className="container" >
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
                              name="zip"
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
