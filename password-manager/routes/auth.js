var express = require('express');
var app = express.Router();
var passport = require('../config/passport');






app.get('/login', function(req, res) {
  // render the page and pass in any flash data if it exists
  res.render('login.ejs', { message: req.flash('loginMessage') });
});

app.get('/signup', function(req, res) {
  // render the page and pass in any flash data if it exists
  res.render('signup.ejs', { message: req.flash('signupMessage') });
});


app.get('/profile', isLoggedIn, function(req, res) {
  res.render('profile.ejs', {
    user : req.user // get the user out of session and pass to template
  });
});


app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});


// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

  // if user is authenticated in the session, carry on
  if (req.isAuthenticated())
    return next();

  res.redirect('/');
}

// Facebook authentication
app.get('/facebook', passport.authenticate('facebook'));
app.get('/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/success',
                                      failureRedirect: '/fail'
                                      , scope : ['email']}));

// Google authentication
app.get('/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
app.get('/google/callback',
  passport.authenticate('google' , { successRedirect: '/success',
                                      failureRedirect: '/fail' }));










module.exports = app;
