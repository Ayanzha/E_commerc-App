const mongoose = require('mongoose')
const winston = require("winston");

const {url} = require('config')

module.exports=function() {
    mongoose.connect(url.slice(1,-1))
    .then(() => winston.info("Connected to MongoDB..."));
}