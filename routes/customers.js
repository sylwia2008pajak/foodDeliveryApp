const {Customer, validate} = require('../models/customer');
const express = require('express');
const router = express.Router();
/* const Joi = require('joi'); */
const { default: mongoose } = require('mongoose');


/* const Customer = mongoose.model("Customer", new mongoose.Schema({
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
 */

//CRUD
//Create
/* async function createCustomer() {
    const customer = new Customer({
        name: "Filip",
        phone: "+48513736721",
        email: "sylwia@gmail.com"
    });
    const result = await customer.save();
    console.log(result);
}
createCustomer(); */

//Read
/* async function getCustomers() {
    return await Customer.find();
}
async function run() {
    const customers = await getCustomers();
    console.log(customers)
}
run(); */

//Update
/* async function updateCustomer(id) {
    const result = await Customer.findByIdAndUpdate(id,{
        $set: {
            name: "Michal",
            phone: "+48555555555",
            email: "kkk@hotmail.com"
        }}, {new:true});
        console.log(result);
    }
updateCustomer('64a82052172698735cf5930c'); */

//Delete
/* async function removeCustomer(id) {
    const result = await Customer.deleteOne({
        _id: id
    });
    console.log(result);
}
removeCustomer('64a81ffba3d54b0418c665f4'); */


//ENDPOINTS

// 1: GET /api/customers
router.get('/', async(req, res) => {
    const customers = await Customer.find();
    res.send(customers)
});

// 2: GET /api/customers/:id
router.get('/:id', async(req, res) => {
    const customer = await Customer.findById(req.params.id);
    if(!customer) return res.status(404).send('the customer with the given id was not found');    
    res.send(customer)
});

// 3 : POST /api/customers
router.post('/', async(req, res) => {
    const { error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    let customer = new Customer(
        {name: req.body.name,
        phone: req.body.phone,
        email: req.body.email}
        );
    customer = await customer.save();
    res.send(customer);
});

// 4: PUT /api/customers/:id
router.put('/:id', async(req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    const customer = await Customer.findByIdAndUpdate(req.params.id, 
        {name: req.body.name,
        phone: req.body.phone,
        email: req.body.email},
        {new: true});
    if(!customer) return res.status(404).send('the customer with the given id was not found');
    res.send(customer);
});

// 5: DELETE /api/customers/:id
router.delete('/:id', async(req, res) => {
    const customer = await Customer.findByIdAndRemove(req.params.id);
    if(!customer) return res.status(404).send('the customer with the given id was not found');
    res.send(customer);
});

/* 
function validateCustomer(customer) {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        phone: Joi.string().min(12).required(),
        email: Joi.string().email().required()
    });
    return schema.validate(customer);
}; */

module.exports = router;