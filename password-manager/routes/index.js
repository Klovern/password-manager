var express = require('express');
var app = express.Router();
//const connection = require('./db.js');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var passport = require('../config/passport');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var nodemailer = require('nodemailer');




app.get('/', function(req, res, next) {
  res.render('index');
});


app.get('/mail', function(){
  let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          user: 'oskar.kindeland@gmail.com',
          pass: '//'
      }
  });

  // setup email data with unicode symbols
  let mailOptions = {
      from: '"Fred Foo 👻" <oskar.kindeland@gmail.com>', // sender address
      to: 'bar@blurdybloop.com, wobbler160@hotmail.com', // list of receivers
      subject: 'Hello ✔', // Subject line
      text: 'Hello world ?', // plain text body
      html: '<b>Hello world ?</b>' // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message %s sent: %s', info.messageId, info.response);
  });
}
);







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
