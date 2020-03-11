const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const router = express.Router();
const UserController = require('../controllers/users');
router.use(cors());

process.env.SECRET_KEY = 'secret';


// Register user
router
  .route('/register')
  .post(UserController.register);

// Login user
router
  .route('/login')
  .post(UserController.login);

// View profile
router.get('/profile', UserController.profile);

// Logout
router.get('/logout', UserController.logout);

module.exports = router;
