const express = require('express');
const cors = require('cors');
const router = express.Router();
router.use(cors());
const WeatherController = require('../controllers/weather');



router.get('/zip', WeatherController.show);

module.exports = router;
