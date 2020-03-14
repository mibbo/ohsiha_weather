import React, { Component } from 'react'
import { register } from './UserFunctions'
import axios from 'axios'


class Register extends Component {
   constructor() {
      super()
      this.state = {
         username: '',
         password: '',
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
      // prevents the page from realoading when the submit button is clicked
      e.preventDefault()

      if (this.state.username === '' || this.state.password === '') {
         this.setState({ error: 'field cannot be blank' })
         return;
      }

      const newUser = {
         username: this.state.username,
         password: this.state.password
      }

      register(newUser).then(status => {
         if (status === 'success') {
            this.props.history.push(`/login`)
         } else {
            this.setState({ error: status })
         }
      })
   }

   render() {
      const { username, password, error } = this.state
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
                           value={username}
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
                           value={password}
                           onChange={this.onChange}
                        />
                     </div>
                     <button
                        type="submit"
                        className="btn btn-lg btn-primary btn-block">
                        Register
              </button>
                     <span>
                        {error}
                     </span>
                  </form>
               </div>
            </div>
         </div>
      )
   }
}

export default Register
