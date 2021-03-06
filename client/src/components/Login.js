import React, { Component } from 'react'
import { login } from './UserFunctions'

import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '../theme';
import { GlobalStyles } from '../global';

class Login extends Component {
   constructor() {
      super()
      this.state = {
         username: '',
         password: '',
         error: '',
         theme: ''
      }

      this.onChange = this.onChange.bind(this)
      this.onSubmit = this.onSubmit.bind(this)
   }

   componentDidMount() {
      this.setState({ theme: localStorage.theme })
   }

   onChange(e) {
      this.setState({ [e.target.name]: e.target.value })
      this.setState({ error: '' })
   }
   onSubmit(e) {
      e.preventDefault()

      const user = {
         username: this.state.username,
         password: this.state.password
      }
      console.log(this.state);

      login(user).then(status => {
         if (status === 'Wrong password') {
            this.setState({ error: status })
         } else if (status === 'User does not exist') {
            this.setState({ error: status })
         } else {
            this.props.history.push(`/profile`)
         }
      })
   }

   render() {
      const { username, password, theme, error } = this.state

      return (
         <div className="container">
            <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
               <>
                  <GlobalStyles />
               </>
            </ThemeProvider>
            <div className="row">
               <div className="col-md-6 mt-5 mx-auto">
                  <form noValidate onSubmit={this.onSubmit}>
                     <h1 className="h3 mb-3 font-weight-normal">Login</h1>
                     <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                           type="text"
                           className="form-control"
                           name="username"
                           required
                           minLength="4"
                           maxLength="16"
                           placeholder="Username"
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
                           required
                           minLength="4"
                           maxLength="16"
                           placeholder="Password"
                           value={password}
                           onChange={this.onChange}
                        />
                     </div>
                     <button
                        type="submit"
                        className="btn btn-lg btn-primary btn-block">
                        Sign in
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

export default Login
