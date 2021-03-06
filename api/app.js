var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
var app = express()
const mongoose = require('mongoose')
const path = require('path')
require("dotenv").config();

const port = process.env.PORT || 5000
//var port = "5000" //tässä oli näin: var port = process.env.PORT || 5000
var password = process.env.DB_PASSWORD

app.use(bodyParser.json())
app.use(cors())
app.use(
  bodyParser.urlencoded({
    extended: false
  })
)


// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, '../client/build')))

// älä käytä tätä
// app.use(express.static(path.resolve(__dirname, '../client/build')));


const url =
  `mongodb+srv://mibbo:${password}@mibbocluster-hquln.mongodb.net/test?retryWrites=true`;

//console.log("atlas salis: " + password);


mongoose
  .connect(
    url,
    { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected to MongoDB Atlas'))
  .catch(err => console.log(err));



// send app to router
require('./router.js')(app);
// var UsersRouter = require('./routes/users')
// var WeatherRouter = require('./routes/weather')
// var EgainRouter = require('./routes/egain')

// app.use('/users', UsersRouter)
// app.use('/weather', WeatherRouter)
// app.use('/egain', EgainRouter)


// AFTER defining routes: Anything that doesn't match what's above, send back index.html; (the beginning slash ('/') in the string is important!)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/../client/build/index.html'))
})


app.listen(port, function () {
  console.log('Server is running on port: ' + port)
})