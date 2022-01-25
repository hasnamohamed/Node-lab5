const mongoose = require("mongoose");
const Joi = require("joi");

const User = mongoose.model("User", new mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        minlength: 8,
        maxlength: 120,
        required: true
    },
    isAdmin: Boolean,
        
}))


const validateUser = (user) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(8).max(12).required(),
        isAdmin: Joi.boolean()
    })
    return schema.validate(user)
}
const validateUserLogin = (user) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(8).max(12).required()
    })
    return schema.validate(user)
}

module.exports = { User, validateUser,validateUserLogin }