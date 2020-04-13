var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
var app = express()
const mongoose = require('mongoose')
var port = process.env.PORT || 5000

app.use(bodyParser.json())
app.use(cors())
app.use(
  bodyParser.urlencoded({
    extended: false
  })
)

const mongoURI = 'mongodb://localhost:27017/database'

mongoose
  .connect(
    mongoURI,
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err))

// send app to router
require('./router.js')(app);
// var UsersRouter = require('./routes/users')
// var WeatherRouter = require('./routes/weather')
// var EgainRouter = require('./routes/egain')

// app.use('/users', UsersRouter)
// app.use('/weather', WeatherRouter)
// app.use('/egain', EgainRouter)


app.listen(port, function () {
  console.log('Server is running on port: ' + port)
})