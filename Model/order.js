const mongoose= require('mongoose');
const Joi = require("@hapi/joi")
Joi.objectId=  require("joi-objectid")(Joi);
const{Product}= require('./products')


const Order = mongoose.model("order",new mongoose.Schema({
    statuses:{
        type: String,
        enum: ['pending','accepted','rejected','canceled'],
        default: 'pending'
    },
    product:[{
        type:mongoose.Schema.Types.ObjectId ,
        ref: 'Product'
    }],


    totalPrice:{
        type:Number,
        required:true,
        default:0
    },

  
}))



function  validatOrder(order) {

    const schema = Joi.object({
        product:Joi.array().items(Joi.ObjectId()).required(),
        totalPrice: joi.number().optional(),

    });
 
    return schema.validate(order);
}  



module.exports.Order = Order;
module.exports.validate = validatOrder;

