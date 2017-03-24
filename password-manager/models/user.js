var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  facebook: {
    id : String,
    token: String,
    email: String,
    Name: String
  },
  google: {
    id : String,
    token : String,
    email : String, // pull the first email
    name : String
  }
});


module.exports = mongoose.model('User', userSchema);
