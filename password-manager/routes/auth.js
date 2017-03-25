var express = require('express');
var app = express.Router();
var passport = require('../config/passport');




// Facebook authentication
app.get('/facebook', passport.authenticate('facebook' , { scope: [ 'email' ] }));
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
