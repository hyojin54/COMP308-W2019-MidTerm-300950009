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

// define the game model
let book = require('../models/books');

/* GET home page. wildcard */
router.get('/', (req, res, next) => {
  res.render('content/index', {
    title: 'Home',
    books: ''
   });
});

module.exports = router;
