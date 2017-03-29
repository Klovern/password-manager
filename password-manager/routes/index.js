'use strict'

var express = require('express');
var app = express.Router();
//const connection = require('./db.js');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var passport = require('../config/passport');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var mail = require('../extra/mail');
var generate = require('../extra/PWgen')
var copy = require('copy-to-clipboard');
var expressValidator = require('express-validator');



app.get('/', function(req, res, next) {
  var cookie = req.cookies.cookieName;
  if (cookie === undefined)
 {
   // no: set a new cookie
   var randomNumber=Math.random().toString();
   randomNumber=randomNumber.substring(2,randomNumber.length);
   res.cookie('cookieName',randomNumber, { maxAge: 900000, httpOnly: true });
   console.log('cookie created successfully');
 }
 else{
   console.log("cookie already exist");
 }
  res.render('index');
});


app.get('/mail', function(req,res,next){
  mail();
});




app.post('/login',
  passport.authenticate('local-login', { successRedirect: '/success',
                                   failureRedirect: '/fail',
                                   failureFlash: true })
);

app.get('/login', function(req, res) {
  // render the page and pass in any flash data if it exists
  console.log(req.cookies);
  res.render('login');
});

app.post('/signup', checkSignupRequest, passport.authenticate('local-signup', {
      successRedirect: '/home',
      failureRedirect: '/signup',
      failureFlash : true,
    })
);

app.post('/signup-generate', function(req,res){
    res.render('signup' ,{ messages: { generated: "" , errors : ""  , email:"" }});
});



app.get('/signup', function(req, res) {

  res.render('signup' ,{ messages: { generated: "" , errors : ""  , email:"" , signupMessage : req.flash('signupMessage')}});


});


app.get('/profile', isLoggedIn, function(req, res) {
  res.render('profile', {
    user : req.user // get the user out of session and pass to template
  });
});


app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});


app.get('/generate',function(req,res){

  res.render('signup' ,{ messages: { generated : generate(), errors : "", email : req.body.email}});
});


app.get('/copy',function(req,res){
  // will copy generated pw to clipboard
});

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

  // if user is authenticated in the session, carry on
  if (req.isAuthenticated())
    return next();

  res.redirect('/');
}

function checkSignupRequest(req, res, next){
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('password', 'Password\'s minimum length is 7').len(7,20);
    req.checkBody('password_confirm', 'Passwords must match').equals(req.body.password);
    //validate
    var errors = req.validationErrors();

    if (errors) {
        res.render('signup',{message : errors.map((e) => e.msg)});
    } else {
      next();
    }
}




module.exports = app;
