const mongoose= require('mongoose');
const joi = require('joi');


const Category = mongoose.model("Category",new mongoose.Schema({
    name:{
        type:String,
        required:true,
        lowercase: true,
        minlength:3,
        maxlength:100,
    }
}))


function  validateCategory(category) {
    const schema = joi.object({
        name: joi.string().min(3).max(100).required(),
    });
 
    return schema.validate(category);
}

module.exports.Category = Category;
module.exports.validate = validateCategory;

