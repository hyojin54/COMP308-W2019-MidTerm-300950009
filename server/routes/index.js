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
let passport = require('passport');

// define models
let book = require('../models/books');
let UserModel = require('../models/users');
let user = UserModel.User;

/* GET home page. wildcard */
router.get('/', (req, res, next) => {
  res.render('content/index', {
    title: 'Home',
    books: '',
    displayName: req.user ? req.user.displayName : ""
   });
});

/* GET - display login page */
router.get('/login', (req, res, next) => {
  // check to see if the user is not already logged in
  if (!req.user) {
    res.render("auth/login", {
      title: "Login",
      messages: req.flash("loginMessage"),
      displayName: req.user ? req.user.displayName : ""
    });
  } 
  else {
    // redirects to the root
    return res.redirect("/books");
  }   
});

/* POST - process login page */
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
      // server error
      if (err) {
        return next(err);
      }
      // user login error
      if (!user) {
        req.flash("loginMessage", "Login Error");
        return res.redirect('/login');
      }

      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        // redirects to the root
        return res.redirect('/');
      });
    })(req, res, next);
});

/* GET - display the registration page */
router.get('/register', (req, res, next) => {
  // check to see if the user is not already logged in
  if(!req.user) {
    res.render('auth/register', {
      title: "Register",
      messages: req.flash('registerMessage'),
      displayName: req.user ? req.user.displayName : ''
    });
  } 
  else {
    // user is already registered
    return res.redirect('/'); 
  }
});

/* POST - process the registration page */
router.post('/register', (req, res, next) => {
  // create user model
  let newUser = new user({
    username: req.body.username,
    email: req.body.email,
    displayName: req.body.displayName
  });

  // register method to add a new user
  user.register(newUser, req.body.password, (err) => {    
    if (err) {
      console.log('Error inserting new user');
      if(err.name == "UserExistsError") {
        req.flash('registerMessage', 'Registration Error: User Already Exists');
      }

      return res.render('auth/register', {
        title: "Register",
        messages: req.flash('registerMessage'),
        displayName: req.user ? req.user.displayName : ''
      });
    }

    // redirect the user (registration is successful)
    return passport.authenticate('local')(req, res, ()=> {
      res.redirect('/');
    });
  });
});

/* GET - perform the logout request */
router.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/'); // redirects back to home page
});

module.exports = router;
