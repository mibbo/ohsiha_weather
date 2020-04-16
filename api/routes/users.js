const express = require('express');
const cors = require('cors');
const router = express.Router();
router.use(cors());
const UserController = require('../controllers/users');


process.env.SECRET_KEY = 'secret';


// Register user
router.post('/register', UserController.register);

// Login user
router.post('/login', UserController.login);

// View profile
router.get('/profile', UserController.profile);

// Change user data (zip code)
router.post('/changeUserData', UserController.changeUserData);

// Get user zip code
router.get('/getUserZip', UserController.getUserZip);

// Logout
router.get('/logout', UserController.logout);

module.exports = router;
