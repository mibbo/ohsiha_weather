import React, { Component } from 'react'
import { register } from './UserFunctions'
import axios from 'axios'


class Register extends Component {
   constructor() {
      super()
      this.state = {
         username: '',
         password: '',
         errors: {}
      }

      this.onChange = this.onChange.bind(this)
      this.onSubmit = this.onSubmit.bind(this)
   }

   onChange(e) {
      this.setState({ [e.target.name]: e.target.value })
   }
   onSubmit(e) {
      // prevents the page from realoading when the submit button is clicked
      e.preventDefault()

      const newUser = {
         username: this.state.username,
         password: this.state.password
      }

      //tapa1: ilman userFunctionia
      return axios
         //sends the body data to backend and runs backend code
         .post('users/register', {
            username: newUser.username,
            password: newUser.password
         })
         // If registering is succesful in backend, switches to login screen
         .then(response => {
            console.log('Registered')
            this.props.history.push(`/login`)
         })
      // tapa2: userFunctionin kanssa
      // register(newUser).then(res => {
      //    this.props.history.push(`/login`)
      // })
   }

   render() {
      return (
         <div className="container">
            <div className="row">
               <div className="col-md-6 mt-5 mx-auto">
                  <form noValidate onSubmit={this.onSubmit}>
                     <h1 className="h3 mb-3 font-weight-normal">Register</h1>
                     <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                           type="text"
                           className="form-control"
                           name="username"
                           placeholder="Enter username"
                           value={this.state.username}
                           onChange={this.onChange}
                        />
                     </div>
                     <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                           type="password"
                           className="form-control"
                           name="password"
                           placeholder="Password"
                           value={this.state.password}
                           onChange={this.onChange}
                        />
                     </div>
                     <button
                        type="submit"
                        className="btn btn-lg btn-primary btn-block">
                        Register
              </button>
                  </form>
               </div>
            </div>
         </div>
      )
   }
}

export default Register
