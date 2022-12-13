const Joi = require('@hapi/joijoi')
module.exports = function () {
    Joi.objectId = require('joi-objectid')(Joi)
    
}