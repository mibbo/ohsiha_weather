
// Load routers
var UsersRouter = require('./routes/users')
var WeatherRouter = require('./routes/weather')


// Setup Routes
module.exports = function (app) {
   app.use('/users', UsersRouter)
   app.use('/weather', WeatherRouter)
};