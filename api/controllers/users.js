const User = require('../models/User')

const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const users = express.Router();
users.use(cors());

process.env.SECRET_KEY = 'secret';

module.exports = {

   async register(req, res) {
      const today = new Date()
      const userData = {
         username: req.body.username,
         password: req.body.password,
         created: today
      }

      User.findOne({
         username: req.body.username
      })
         .then(user => {
            if (!user) {
               bcrypt.hash(req.body.password, 10, (err, hash) => {
                  userData.password = hash
                  User.create(userData)
                     .then(user => {
                        res.json({ status: user.username + 'Registered!' })
                     })
                     .catch(err => {
                        res.send('error: ' + err)
                        res.json({ error: 'User already exists' })
                     })
               })
            } else {
               res.json({ error: 'User already exists' })
            }
         })
         .catch(err => {
            res.send('error: ' + err)
         })
   },


   async login(req, res) {
      User.findOne({
         username: req.body.username
      })
         .then(user => {
            if (user) {
               if (bcrypt.compareSync(req.body.password, user.password)) {
                  // Passwords match
                  const payload = {
                     _id: user._id,
                     username: user.username
                  }
                  let token = jwt.sign(payload, process.env.SECRET_KEY, {
                     expiresIn: 1440
                  })
                  res.status(200).send(token)
               } else {
                  // Passwords don't match
                  res.status(400).json({ error: 'Wrong password' })
               }
            } else {
               res.status(400).json({ error: 'User does not exist' })
            }
         })
         .catch(err => {
            res.send('error: ' + err)
         })
   },


   async profile(req, res) {
      var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

      User.findOne({
         _id: decoded._id
      })
         .then(user => {
            if (user) {
               res.json(user)
            } else {
               res.send('User does not exist')
            }
         })
         .catch(err => {
            res.send('error: ' + err)
         })
   },


   async logout(req, res) {
   }

};
