const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const users = express.Router();
const UserController = require('../controllers/users');
users.use(cors());

process.env.SECRET_KEY = 'secret';


// Register user
users.post('/register', UserController.register);

// Login user
users.post('/login', UserController.login);

// View profile
users.get('/profile', UserController.profile);

// Logout
users.get('/logout', UserController.logout);

module.exports = users;
