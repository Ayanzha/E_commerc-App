module.exports = function (req, res, next) {
    if (!req.user.userType=="anonymouse") {
        return res.status(403).send("Access denied.");
    }
    next();
}