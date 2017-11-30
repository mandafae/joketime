const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const knex = require('../db/knex');
const bcrypt = require('bcrypt-as-promised');
const app = express();

router.get('/', function(req, res) {
  knex('users').then(users => {
    //console.log(users);
    res.json(users);
    })
  })

// GET '/users/:id' - view profile - NOT WORKING
// router.get('/:id', (req, res, next) => {
//   console.log('profile route');
//   knex('users')
//   .where({id: req.session.user.id})
//   .first()
//   .then(user => {
//     res.json(user)
//   })
// })

// PATCH '/users/:id' - add favorite joke - NOT WORKING
router.patch('/:id', (req, res, next) => {
  console.log('favorite route');
  console.log(req.body);
  knex('users')
  .where({id: req.params.id})
  .first()
  // .update({favorites: favorites.push(req.body.joke)})
  .then(user => {
    res.send(user.favorites)
  })
})

// POST '/users/login' - log a user into app
router.post('/login', (req, res, next) => {
  console.log('login route')
  console.log('req.body.username:', req.body.username);
  console.log('req.body.password:', req.body.password);
  knex('users')
  .where({username: req.body.username})
  .first()
  .then(user => bcrypt.compare(req.body.password, user.hash)
    .then(valid => {
      if(valid) {
        req.session.user = user;
        console.log(req.session.user)
        res.json(user)
      }
    }).catch( (invalid) => {
      res.send('error')
  }))
})

// POST '/users/signup' - register a new user
router.post('/signup', (req, res, next) => {
  bcrypt.hash(req.body.password, 12)
 .then(hash => {
   knex('users')
   .returning('*')
   .insert({username: req.body.username, hash: hash})
   .then(user => {
     req.session.user = user[0];
     console.log(req.session.user);
     res.json(user)
   }).catch( (err) => {
     res.send('error')
   })
 }).catch( (err) => {
   next(err);
  })
 })

module.exports = router;
