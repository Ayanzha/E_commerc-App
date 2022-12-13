const config = require('config')

module.exports = function () {
    if (!config.get("jwtPrivateKey")) {
        throw new Error("ERROR: jwtPrivateKey not provided");
    }
}

module.exports.url = function() {
    if (!config.get("mongodb.URL")) {
        throw new Error("ERROR: URL not provided");
    }
}