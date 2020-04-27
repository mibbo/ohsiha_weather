const User = require('../models/User')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


process.env.SECRET_KEY = 'secret';

module.exports = {

   async register(req, res) {
      const today = new Date()
      const userData = {
         username: req.body.username,
         password: req.body.password,
         zipcode: '',
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
                        res.json({ status: 'Registered!' })
                     })
                     .catch(err => {
                        res.json({ error: 'User already exists' })
                        console.log('catch error');
                     })
               })
            } else {
               res.json({ error: 'User already exists' })
               console.log('user exists');
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
                     expiresIn: '24h' //1440
                  })

                  console.log('-----------backend login token eli juuri tehty token-------------');
                  console.log(token);
                  console.log('------------------------');

                  res.send(token)
                  console.log("token");
               } else {
                  // Passwords don't match
                  res.json({ error: 'Wrong password' })
                  console.log('wrong password');
               }
            } else {
               res.json({ error: 'User does not exist' })
               console.log('user does not exist');
            }
         })
         .catch(err => {
            res.send('error: ' + err)
         })
   },


   async profile(req, res) {
      console.log('-----------backend profile token-------------');
      console.log(req.headers['authorization']);
      console.log('------------------------');

      var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

      User.findOne({
         _id: decoded._id
      })
         .then(user => {
            if (user) {
               res.json(user)
            } else {
               res.json({ error: 'Please login' })
            }
         })
         .catch(err => {
            res.send('error: ' + err)
         })
   },

   async changeUserData(req, res) {
      User.findOneAndUpdate(
         { username: req.body.username },
         { $set: { zipcode: req.body.zip } },
         { upsert: true, useFindAndModify: false }, function (err, doc) {
            if (err) { throw err; }
            else {
               console.log("zipcode updated");
            }
         });

      User.findOne(
         { username: req.body.username },
         function (err, doc) {
            if (err) { throw err; }
            else {
               console.log("found");
               console.log(doc.zipcode);
               res.send(doc.zipcode)
            }
         });
   },

   async getUserZip(req, res) {
      console.log('käyttäjätunnus: ' + req.headers['username']);
      if (req.headers['username'] === undefined) {
         console.log('no user logon');
         res.send('33720')
      } else {
         User.findOne(
            { username: req.headers['username'] },
            function (err, doc) {
               if (err) { throw err; }
               else {
                  if (doc.zipcode === null || doc.zipcode === undefined || doc.zipcode === '') {
                     console.log('user zip not set');
                     res.send('33720')
                  } else {
                     console.log('user zip: ' + doc.zipcode);
                     res.send(doc.zipcode);
                  }
               }
            });
      }
   },


   async logout(req, res) {
   }

};
