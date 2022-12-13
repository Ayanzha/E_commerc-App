require('express-async-errors');
const express = require("express");
const helmet = require("helmet"); 
const morgan = require("morgan");
const config = require("config"); 
const mongoose = require("mongoose"); 
const winston = require("winston");
const express = require("express");
const { jwt } = require('./startup/config');
const app = express();

require("./startup/logging")();
require("./startup/routes")(app);
require("./startup/db")();
jwt();

let port = process.env.PORT || 3000 ;
app.listen(port,()=>{console.log(`Listening on port ${port} ....`)})







