var express = require('express');
var app = express.Router();
//const connection = require('./db.js');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var passport = require('../config/passport');
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.get('/', function(req, res, next) {
  res.render('index');
});




app.post('/login',
  passport.authenticate('local-login', { successRedirect: '/success',
                                   failureRedirect: '/fail',
                                   failureFlash: true })
);

app.get('/login', function(req, res) {
  // render the page and pass in any flash data if it exists
  res.render('login');
});


app.post('/signup', passport.authenticate('local-signup', {
                                    successRedirect : '/success', // redirect to the secure profile section
                                    failureRedirect : '/signups', // redirect back to the signup page if there is an error
                                    failureFlash : true  })
);

app.get('/signup', function(req, res) {
  // render the page and pass in any flash data if it exists
  res.render('signup');
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


// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

  // if user is authenticated in the session, carry on
  if (req.isAuthenticated())
    return next();

  res.redirect('/');
}

app.get('/genereate',function(req,res){

});



module.exports = app;
