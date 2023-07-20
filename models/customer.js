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
    const customer = new Customer({
        name: "test",
        phone: "+48111111111"
    });
    const result = await customer.save();
    console.log(result);
}
//createCustomer();

//Read
async function getCustomers() {
    return await Customer.find();
}
async function run() {
    const customers = await getCustomers();
    console.log(customers)
}
//run();

//Update
async function updateCustomer(id) {
    if(validateObjectId(id)) {
        const result = await Customer.findByIdAndUpdate(id,{
        $set: {
            name: "test2",
            phone: "+48555555555"/* ,
            email: "test2@hotmail.com" */
        }}, {new:true});
        console.log(result);
    } else {
        console.log('Invalid objectId')
    }
}
//updateCustomer('64b8dc97913c3e3c0b73eeb5');

//Delete
async function removeCustomer(id) {
    if(validateObjectId(id)) {
        const result = await Customer.deleteOne({
        _id: id
    });
        console.log(result);
    } else {
    console.log('Invalid objectId')
    }
}
//removeCustomer('64b8dc97913c3e3c0b73eeb5');

exports.Customer = Customer;
exports.validate = validateCustomer;