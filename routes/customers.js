const express = require('express');
const router = express.Router();
const Joi = require('joi');

const customers = [
    {id: 1, name: 'Jan'},
    {id: 2, name: 'Max'},
    {id: 3, name: 'Laura'}
];

//1
router.get('/', (req, res) => {
    res.send(customers)
});

//2
router.get('/:id', (req, res) => {
    const customer = customers.find(c => c.id ===
        parseInt(req.params.id));
    if(!customer) return res.status(404).send('the customer with the given id was not found');    
    res.send(customer)
});

//3
router.post('/', (req, res) => {
    const result = validateCustomer(req.body);
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }
    const customer = {
        id: customers.length +1,
        name: req.body.name
    };
    customers.push(customer);
    res.send(customer);
});

//4
router.put('/:id', (req, res) => {
    const customer = customers.find(c => c.id ===
        parseInt(req.params.id));
    if(!customer) return res.status(404).send('the customer with the given id was not found');
    const result = validateCustomer(req.body);
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }
    customer.name = req.body.name;
    res.send(customer);
});

//5
router.delete('/:id', (req, res) => {
    const customer = customers.find(c => c.id ===
        parseInt(req.params.id));
    if(!customer) return res.status(404).send('the customer with the given id was not found');
        const index = customers.indexOf(customer);
        customers.splice(index, 1);
        res.send(customer);
});

function validateCustomer(customer) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
    return schema.validate(customer);
};

module.exports = router;