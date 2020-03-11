import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'

class Landing extends Component {

   //define logout function
   logOut(event) {
      event.preventDefault()
      //removes usertoken from localStorage
      localStorage.removeItem('usertoken')
      //pushes the user (url) back to '/'
      this.props.history.push('/')
   }

   // buttons for user login/register/profile/logout
   render() {

      // no user token
      const loginRegLink = (
         <ul className="navbar-nav">
            <li className="nav-item">
               <Link to="/login" className="nav-link">
                  Login
          </Link>
            </li>
            <li className="nav-item">
               <Link to="/register" className="nav-link">
                  Register
          </Link>
            </li>
         </ul>
      )

      // If the user token exists
      const userLink = (
         <ul className="navbar-nav">
            <li className="nav-item">
               <Link to="/profile" className="nav-link">
                  User
          </Link>
            </li>
            <li className="nav-item">
               <a href="" onClick={this.logOut.bind(this)} className="nav-link">
                  Logout
          </a>
            </li>
         </ul>
      )

      //bootstrap navbar + condition(userLink/loginRegLink)
      return (
         <nav className="navbar navbar-expand-lg navbar-dark bg-dark rounded">
            <button
               className="navbar-toggler"
               type="button"
               data-toggle="collapse"
               data-target="#navbarsExample10"
               aria-controls="navbarsExample10"
               aria-expanded="false"
               aria-label="Toggle navigation"
            >
               <span className="navbar-toggler-icon" />
            </button>

            <div
               className="collapse navbar-collapse justify-content-md-center"
               id="navbarsExample10"
            >
               <ul className="navbar-nav">
                  <li className="nav-item">
                     <Link to="/" className="nav-link">
                        Home
                 </Link>
                  </li>
               </ul>
               {/* condition to display links:
                   if the token exists -> userLink -group
                   if not              -> loginRegLink -group*/}
               {localStorage.usertoken ? userLink : loginRegLink}
            </div>
         </nav>
      )
   }
}

//allows to push states in our component
export default withRouter(Landing)
