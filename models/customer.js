const Joi = require('joi');
const { default: mongoose } = require('mongoose');

const Customer = mongoose.model("Customer", new mongoose.Schema({
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
}));

function validateCustomer(customer) {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        phone: Joi.string().min(12).required(),
        email: Joi.string().email().required()
    });
    return schema.validate(customer);
};

exports.Customer = Customer;
exports.validate = validateCustomer;