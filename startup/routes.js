require('express-async-errors');
const express = require("express");
const helmet = require("helmet"); 
const morgan = require("morgan");
const error = require('../middleware/error');
const winston = require('winston');
const categories = require("./routes/categories");
const products = require("./routes/products");
const order = require("./routes/order");

module.exports = function (app) {
    app.use(express.json());
    app.use(helmet());
    app.use("/api/categories",categories);
    app.use("/api/products",products);
    app.use("/api/order",order);
    app.use("/api/users", users);
    app.use("/api/auth", auth);
    app.use(error);
    if (app.get('env') === 'development') {
        app.use(morgan('tiny'));
        winston.info("Morgan enabled...");
    }

}
