const mongoose = require("mongoose");
const Joi = require("joi");
const Plan = mongoose.model("Plan", new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        }
    ]
}))

const validatePlan = (plan) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        price: Joi.string().min(8).max(12).required()
    })
    return schema.validate(plan)
}
module.exports = { Plan ,validatePlan};
