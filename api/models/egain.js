const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema for the login credentials
const EgainSchema = new Schema({
   temperature: {
      type: Number,
      required: true
   },
   humidity: {
      type: Number,
      required: true
   },
   date: {
      type: Date,
      default: Date.now
   }
})

// export with the name of "users" so other JS files can read it
module.exports = User = mongoose.model('egain', EgainSchema)
