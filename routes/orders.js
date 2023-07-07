const express = require('express');
const router = express.Router();
const Joi = require('joi');

const orders = [
    {id: 1, customer: 'Max', dish:'Paella', date: "07.07.2023"},
    {id: 2, customer: 'Helen', dish:'Pasta', date: "07.07.2023"},
    {id: 3, customer: 'BLiss', dish:'Ratatouille', date: "07.07.2023"}
];

//1
router.get('/', (req, res) => {
    res.send(orders)
});

//2
router.get('/:id', (req, res) => {
    const order = orders.find(c => c.id ===
        parseInt(req.params.id));
    if(!order) return res.status(404).send('the order with the given id was not found');    
    res.send(order)
});

//3
router.post('/', (req, res) => {
    const result = validateOrder(req.body);
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }
    const order = {
        id: orders.length +1,
        dish: req.body.dish
    };
    orders.push(order);
    res.send(order);
});

//4
router.put('/:id', (req, res) => {
    const order = orders.find(c => c.id ===
        parseInt(req.params.id));
    if(!order) return res.status(404).send('the order with the given id was not found');
    const result = validateOrder(req.body);
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }
    order.customer = req.body.customer;
    order.dish = req.body.dish;
    order.date = req.body.date;
    res.send(order);
});

//5
router.delete('/:id', (req, res) => {
    const order = orders.find(c => c.id ===
        parseInt(req.params.id));
    if(!order) return res.status(404).send('the order with the given id was not found');
        const index = orders.indexOf(order);
        orders.splice(index, 1);
        res.send(order);
});

function validateOrder(order) {
    const schema = Joi.object({
        customer: Joi.string().min(3).required(),
        dish: Joi.string().min(3).required(),
        date: Joi.string().min(3).required()
    });
    return schema.validate(order);
};

module.exports = router;