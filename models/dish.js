const Joi = require('joi');
const { default: mongoose } = require('mongoose');
const {cuisineSchema} = require('./cuisine');

const Dish = mongoose.model("Dish", new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2
    },
    cuisine: {
        type: cuisineSchema,
        required: true
    },
    ingredients: {
        type: Array,
        validate: {
            validator: function (v) {
                return v && v.length > 0;
            },
            message: 'A dish should have at least one ingredient.'
        }
    },
    calories: {
        type: Number,
        required: true,
        min: 0
    },
    price: {
        type: Number,
        required: true,
        min: 0
    }
}));

function validateDish(dish) {
    const schema = Joi.object({
        name: Joi.string().min(2).required(),
        cuisineId: Joi.objectId().required(),
        ingredients: Joi.array().min(1).required(),
        calories: Joi.number().min(0).required(),
        price: Joi.number().min(0).required()
    });
    return schema.validate(dish);
};

exports.Dish = Dish;
exports.validate = validateDish;