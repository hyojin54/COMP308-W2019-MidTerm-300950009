/*
COMP308-W2019-MidTerm-300950009

File name: server/routes/index.js
Student's name: Hyojin Kim
Student's number: 300950009
Date: February 25, 2019
*/

// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define models
let book = require('../models/books');
let UserModel = require('../models/users');
let user = UserModel.User;

/* GET home page. wildcard */
router.get('/', (req, res, next) => {
  res.render('content/index', {
    title: 'Home',
    books: ''
   });
});

/* GET - display login page */
router.get('/login', (req, res, next) => {
  // TODO
  res.render('auth/login', {
    title: 'Login'
   });
});

/* POST - process login page */
router.post('/login', (req, res, next) => {
  // TODO
});

/* GET - display the registration page */
router.get('/register', (req, res, next) => {
  // TODO
  res.render('auth/register', {
    title: 'Register'
   });
});

/* POST - process the registration page */
router.post('/register', (req, res, next) => {
  // TODO
});

/* GET - perform the logout request */
router.get('/logout', (req, res, next) => {
  // TODO
});

module.exports = router;
