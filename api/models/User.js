const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema for the login credentials
const UserSchema = new Schema({
   username: {
      type: String,
      required: true
   },
   password: {
      type: String,
      required: true
   },
   zipcode: {
      type: String,
      required: false
   },
   date: {
      type: Date,
      default: Date.now
   }
})

// export with the name of "users" so other JS files can read it
module.exports = User = mongoose.model('users', UserSchema)
