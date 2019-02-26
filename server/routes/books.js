/*
COMP308-W2019-MidTerm-300950009

File name: server/routes/books.js
Student's name: Hyojin Kim
Student's number: 300950009
Date: February 25, 2019
*/

// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
let book = require('../models/books');

// authorization
function requireAuth(req, res, next) {
  //check if the user is logged in
  if (!req.isAuthenticated()) {
      return res.redirect('/login');
  }
  next();
}

/* GET books List page. READ */
router.get('/', requireAuth, (req, res, next) => {
  // find all books in the books collection
  book.find((err, books) => {
    if (err) {
      console.log(err);
      res.end(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        books: books,
        displayName: req.user ? req.user.displayName : ""
      });
    }
  });
});

//  GET the Book Details page in order to add a new Book
router.get('/add', requireAuth, (req, res, next) => {
  res.render('books/details', {
    title: 'Book Details',
    books: ''
  });
});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', requireAuth, (req, res, next) => {
  // create book model
  let newBook = book({
    "Title": req.body.title,
    "Description": req.body.description,
    "Price": req.body.price,
    "Author": req.body.author,
    "Genre": req.body.genre
  });

  // create method to add a new book to the database
  book.create(newBook, requireAuth, (err, book) => {
    if (err) {
      console.log(err);
      res.end(err);
    }
    else {
      // refresh the book list
      res.redirect('/books');
    }
  });  
});

// GET the Book Details page in order to edit an existing Book
router.get('/:id', requireAuth, (req, res, next) => {
  let id = req.params.id;

  // findById method to render the book details view
  book.findById(id, (err, book) => {
    if (err) {
      console.log(err);
      res.end(err);
    }
    else {
      res.render('books/details', {
        title: 'Book Details',
        books: book
      });
    }
  });
});

// POST - process the information passed from the details form and update the document
router.post('/:id', requireAuth, (req, res, next) => {
  let id = req.params.id;

  // create book model
  let updatedBook = book({
    "_id": id,
    "Title": req.body.title,
    "Description": req.body.description,
    "Price": req.body.price,
    "Author": req.body.author,
    "Genre": req.body.genre
  });

  // update method to edit an existing book in the database
  book.update({_id: id}, requireAuth, updatedBook, (err) => {
    if(err) {
      console.log(err);
      res.end(err);
    }
    else {
      // refresh the book list
      res.redirect('/books');
    }
  });
});

// GET - process the delete by user id
router.get('/delete/:id', requireAuth, (req, res, next) => {
  let id = req.params.id;

  // remove method to delete an existing book in the database
  book.remove({_id: id}, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } 
    else {
      // refresh the book list
      res.redirect('/books');
    }
  });
});

module.exports = router;
