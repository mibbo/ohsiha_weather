const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema for the login credentials
const UserSchema = new Schema({
   first_name: {
      type: String
   },
   last_name: {
      type: String
   },
   email: {
      type: String,
      required: true
      // spostin, etunimen ja sukunimen tilalle vain käyttäjänimi
   },
   password: {
      type: String,
      required: true
   },
   date: {
      type: Date,
      default: Date.now
   }
})

// export with the name of "users" so other JS files can read it
module.exports = User = mongoose.model('users', UserSchema)
