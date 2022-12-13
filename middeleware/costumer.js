const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
    const token = req.header("x-costumer-token");
    if (!token) {
        return res.status(401).send("Access denied. Invalid token.");
    }

    req.user = jwt.decode(token, "jwtSecretKey");
    if (!req.user) {
        return res.status(401).send("Access denied. Invalid token.");
    }
    
    console.log(req.user);
    next();
}