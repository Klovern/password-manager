const crypto = require('crypto');


module.exports = {
  validateIp : function(whIp, req) {
    return whIp.find(x => x === req)
  },
  encryptCookieAuth : function(secret, mess){
    return crypto.createHmac('sha256', secret).update(mess).digest('hex');
  }
}
