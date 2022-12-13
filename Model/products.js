const mongoose= require('mongoose');
const Joi = require('@hapi/joi');
Joi.ObjectId = require('joi-objectid');


const Product = mongoose.model("Product",new mongoose.Schema({
    name:{
        type:String,
        required:true,
        lowercase: true,
        minlength:3,
        maxlength:100,
    },
    categories:[{
        type:mongoose.Schema.Types.ObjectId ,
        ref: 'Category'
    }],

    

    description:{
        type:String,
        optional:true
    },

    price:{
        type:Number,
        required:true,
        min:0,
    },

    avilableInStock: {
        type: Number,
        min:0,
        max:1000
    },
}))


function  validatproduct(product) {

    const schema = Joi.object({
        name: Joi.string().min(3).max(100).required(),
        categories:Joi.array().items(Joi.ObjectId()).required(),
        price:Joi.number().required(),
        description: Joi.string().optional(),
        avilableInStock: Joi.number().required(),

    });
 
    return schema.validate(product);
}  



module.exports.Product = Product;
module.exports.validate = validatproduct;
