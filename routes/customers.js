const {Customer, validate} = require('../models/customer');
const express = require('express');
const router = express.Router();
const { default: mongoose } = require('mongoose');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');


//ENDPOINTS

// 1: GET /api/customers
router.get('/', async(req, res) => {
    try {
        const customers = await Customer.find();
        res.send(customers)
    } catch (err) {
        console.error('Error getting customers: ', err);
        throw err;
    }
});

// 2: GET /api/customers/:id
router.get('/:id', async(req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        if(!customer) return res.status(404).send('the customer with the given id was not found');    
        res.send(customer)
    } catch (err) {
        console.error('Error getting customer: ', err);
        throw err;
    }
});

// 3 : POST /api/customers
router.post('/', auth, async(req, res) => {
    try {
        const { error} = validate(req.body);
        if(error) return res.status(400).send(error.details[0].message);
        let customer = new Customer(
            {name: req.body.name,
            phone: req.body.phone
            });
        customer = await customer.save();
        res.send(customer);
    } catch (err) {
        console.error('Error creating customer: ', err);
        throw err;
    }
});

// 4: PUT /api/customers/:id
router.put('/:id', auth, async(req, res) => {
    try {
        const { error } = validate(req.body);
        if(error) return res.status(400).send(error.details[0].message);
        const customer = await Customer.findByIdAndUpdate(req.params.id, 
            {name: req.body.name,
            phone: req.body.phone},
            {new: true});
        if(!customer) return res.status(404).send('the customer with the given id was not found');
        res.send(customer);
    } catch (err) {
        console.error('Error updating customer: ', err);
        throw err;
    }        
});

// 5: DELETE /api/customers/:id
router.delete('/:id', [auth, admin], async(req, res) => {
    try {
        const customer = await Customer.findByIdAndRemove(req.params.id);
        if(!customer) return res.status(404).send('the customer with the given id was not found');
        res.send(customer);
    } catch (err) {
        console.error('Error removing customer: ', err);
        throw err;
    }
});

module.exports = router;