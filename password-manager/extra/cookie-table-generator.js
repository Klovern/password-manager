
// Generates cookietable txt 

var generate = require('../extra/PWgen')
var fs = require('fs');
var cookietable = require('../validation/cookie-table.js');


for (var i = 0; i < 1000; i++) {
  var cookiestring = `auth${i} : "${generate()}" , \n`;
  fs.appendFile('cookie-table.txt', cookiestring , function (err) {
     if (err) return console.log(err);
     console.log('Appended!');
  });
};
