// Load routers
var UsersRouter = require('./routes/users')
var WeatherRouter = require('./routes/weather')
// var EgainRouter = require('./routes/egain')  ///yhdistetty weatheriin

// Setup Routes
module.exports = function (app) {
   app.use('/users', UsersRouter)
   app.use('/weather', WeatherRouter)
   // app.use('/egain', EgainRouter)
};