let validateIp = function(whIp, req) {
    return whIp.find(x => x === req)
}

module.exports = validateIp;
