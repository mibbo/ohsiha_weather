const express = require('express');
const cors = require('cors');
const router = express.Router();
router.use(cors());
const WeatherController = require('../controllers/weather');

router.get('/zipWeather', WeatherController.zip);
router.get('/roomTemp', WeatherController.roomTemp);


module.exports = router;
