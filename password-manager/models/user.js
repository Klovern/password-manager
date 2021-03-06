var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');


var cookieSchema = new mongoose.Schema({
  email: String,
  authMessage: String ,
  authMethod : String,
});


var userSchema = mongoose.Schema({

   local  : {
    email : String,
    password : String,
    whIp: [String],
    authCookies : [cookieSchema]
  },

  facebook: {
    id : String,
    token: String,
    email: String,
    Name: String,
    whIp: [String],
  },

  google: {
    id : String,
    token : String,
    email : String,
    name : String,
    whIp: [String],
  }
});




// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', userSchema);
