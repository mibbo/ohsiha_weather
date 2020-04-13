const express = require('express');
const cors = require('cors');
const router = express.Router();
router.use(cors());
const WeatherController = require('../controllers/weather');

router.get('/zipWeather', WeatherController.zip);
router.get('/roomTemp', WeatherController.roomTemp);
router.get('/roomTempHistory', WeatherController.roomTempHistory);



module.exports = router;
