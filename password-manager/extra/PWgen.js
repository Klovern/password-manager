var generator = require('generate-password');

module.exports = function(){
  var password = generator.generate({
    length: 16,
    numbers: true
  });
  return password
}
