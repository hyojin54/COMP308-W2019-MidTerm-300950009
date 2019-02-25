/*
COMP308-W2019-MidTerm-300950009

File name: server/models/books.js
Student's name: Hyojin Kim
Student's number: 300950009
Date: February 25, 2019
*/

let mongoose = require('mongoose');

// create a model class
let bookesSchema = mongoose.Schema({
    Title: String,
    Description: String,
    Price: Number,
    Author: String,
    Genre: String
},
{
  collection: "books"
});

module.exports = mongoose.model('books', bookesSchema);
