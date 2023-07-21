const {Order, validate} = require('../models/order');
const {Dish} = require('../models/dish');
const {Customer} = require('../models/customer');
const express = require('express');
const router = express.Router();
const { default: mongoose } = require('mongoose');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');


//ENDPOINTS

// 1: GET /api/orders
router.get('/', async(req, res) => {
    try {
        const orders = await Order.find();
        res.send(orders);
    } catch (err) {
        console.error('Error getting orders: ', err);
        throw err;
    }
});

// 2: GET /api/orders/:id
router.get('/:id', async(req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if(!order) return res.status(404).send('the order with the given id was not found');    
        res.send(order);
    } catch (err) {
        console.error('Error getting order: ', err);
        throw err;
    }
});

// 3 : POST /api/orders
router.post('/', auth, async(req, res) => {
    try {
        const { error } = validate(req.body);
        if(error) return res.status(400).send(error.details[0].message);

        const customer = await Customer.findById(req.body.customerId);
        if(!customer) return res.status(400).send('Invalid customer');

        const dish = await Dish.findById(req.body.dishId);
        if(!dish) return res.status(400).send('Invalid dish');

        let order = new Order({
            customer: {
                _id: customer._id,
                name: customer.name,
                phone: customer.phone},
            dish: {
                _id: dish._id,
                name: dish.name,
                ingredients: dish.ingredients,
                cuisine: dish.cuisine,
                calories: dish.calories,
                price: dish.price
            },
            date: Date.now()
        });
        order = await order.save();
        res.send(order);
    } catch (err) {
        console.error('Error creating order: ', err);
        throw err;
    }
});

// 4: PUT /api/orders/:id
router.put('/:id', auth, async(req, res) => {
    try {
        const { error } = validate(req.body);
        if(error) return res.status(400).send(error.details[0].message);
    
        const customer = await Customer.findById(req.body.customerId);
        if(!customer) return res.status(400).send('Invalid customer');

        const dish = await Dish.findById(req.body.dishId);
        if(!dish) return res.status(400).send('Invalid dish');

        const order = await Order.findByIdAndUpdate(req.params.id,
            {customer: {
                _id: customer._id,
                name: customer.name,
                phone: customer.phone 
            },
            dish: {
                _id: dish._id,
                name: dish.name,
                ingredients: dish.ingredients,
                cuisine: dish.cuisine,
                calories: dish.calories,
                price: dish.price
            },
            date: Date.now()},
            {new: true});
        if(!order) return res.status(404).send('the order with the given id was not found');
        res.send(order);
    } catch (err) {
        console.error('Error updating order: ', err);
        throw err;
    }
});

// 5: DELETE /api/orders/:id
router.delete('/:id', [auth, admin], async(req, res) => {
    try {
        const order = await Order.findByIdAndRemove(req.params.id);
        if(!order) return res.status(404).send('the order with the given id was not found');
        res.send(order);
    } catch (err) {
        console.error('Error removing order: ', err);
        throw err;
    }
});

module.exports = router;