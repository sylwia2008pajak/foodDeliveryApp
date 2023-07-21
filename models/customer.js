const Joi = require('joi');
const { default: mongoose } = require('mongoose');
const validateObjectId = require('../middleware/validateObjectId');

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
    }
}));

function validateCustomer(customer) {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        phone: Joi.string().min(12).required()
    });
    return schema.validate(customer);
};

//CRUD
//Create
async function createCustomer() {
    try {
        const customer = new Customer({
            name: "test",
            phone: "+48111111111"
        });
        const result = await customer.save();
        console.log(result);
    } catch (err) {
        console.error('Error creating customer: ', err);
        throw err;
    }
}
//createCustomer();

//Read
async function getCustomers() {
    try {
        return await Customer.find();
    } catch (err) {
        console.error('Error getting customers: ', err);
        throw err;
    }
}
async function run() {
    try {
        const customers = await getCustomers();
        console.log(customers)
    } catch (err) {
        console.error('Error getting customers: ', err);
        throw err;
    }
}
//run();

//Update
async function updateCustomer(id) {
    try {
        if(validateObjectId(id)) {
            const result = await Customer.findByIdAndUpdate(id,{
            $set: {
                name: "test2",
                phone: "+48555555555"
            }}, {new:true});
            console.log(result);
        } else {
            console.log('Invalid objectId')
        }
    } catch (err) {
        console.error('Error updating customer: ', err);
        throw err;
    }
}
//updateCustomer('64b8dc97913c3e3c0b73eeb5');

//Delete
async function removeCustomer(id) {
    try {
        if(validateObjectId(id)) {
            const result = await Customer.deleteOne({
            _id: id
        });
            console.log(result);
        } else {
            console.log('Invalid objectId')
        }
    } catch (err) {
        console.error('Error removing customer: ', err);
        throw err;
    }
}
//removeCustomer('64b8dc97913c3e3c0b73eeb5');

exports.Customer = Customer;
exports.validate = validateCustomer;