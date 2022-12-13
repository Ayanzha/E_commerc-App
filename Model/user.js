const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Joi = require("joi");
const { required } = require("@hapi/joi");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 100
    },
    email: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 1024
    },
    userType: {
        type: String,
    },
    orders:[{
        type:mongoose.Schema.Types.ObjectId ,
        ref: 'Order'},
        ]
    
});

userSchema.methods.generateAuthToken = function() {
    return jwt.sign({ _id: this._id, userType: this.userType }, "jwtSecretKey");
}

const User = mongoose.model("User", userSchema);

function validateUser(user) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(100).required(),
        email: Joi.string().min(3).max(255).required().email(),
        password: Joi.string().min(3).max(255).required(),
        orders:Joi.array().items(Joi.ObjectId()),
        
    });

    return schema.validate(user);
}

module.exports.User = User;
module.exports.validate = validateUser;