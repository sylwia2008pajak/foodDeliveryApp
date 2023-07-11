const Joi = require('joi');
const { default: mongoose } = require('mongoose');
const {cuisineSchema} = require('./cuisine');

const Order = mongoose.model("Order", new mongoose.Schema({
    customer: {
        type: new mongoose.Schema({
            name: {
                type: String,
                required: true,
                minlength: 3
            },
            phone: {
                type: String,
                required: true,
                minlength: 12
            },
            email: {        
                type: String,
                trim: true,
                lowercase: true,
                unique: true,
                required: true,
                match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
            }
        }),
        required: true
    },
    dish: {
        type: new mongoose.Schema({
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

        }),
        required: true
    },
    date: { 
        type: Date, 
        default: Date.now(),
    }
}));

function validateOrder(order) {
    const schema = Joi.object({
        customerId: Joi.objectId().required(),
        dishId: Joi.objectId().required()
    });
    return schema.validate(order);
};

exports.Order = Order;
exports.validate = validateOrder;