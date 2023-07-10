const express = require('express');
const router = express.Router();
const Joi = require('joi');
const { default: mongoose } = require('mongoose');

const orders = [
    {id: 1, customer: 'Max', dish:'Paella', date: "07.07.2023"},
    {id: 2, customer: 'Helen', dish:'Pasta', date: "07.07.2023"},
    {id: 3, customer: 'BLiss', dish:'Ratatouille', date: "07.07.2023"}
];

const Order = mongoose.model("Order", new mongoose.Schema({
    customer: {
        type: String,
        minlength: 3,
        required: true
    },
    dish: {
        type: String,
        minlength: 3,
        required: true
    },
    date: { 
        type: Date, 
        default: Date.now(),
    }
}));


//CRUD
//Create
async function createOrder() {
    const order = new Order({
        customer: "Sylwia",
        dish: "Hamburger",
    });
    const result = await order.save();
    console.log(result);
}
//createOrder();

//Read
async function getOrders() {
    return await Order.find();
}
async function run() {
    const orders = await getOrders();
    console.log(orders)
}
//run();

//Update
async function updateOrder(id) {
    const result = await Order.findByIdAndUpdate(id,{
        $set: {
            customer: "Maxwel",
            dish: "Hamburger wit no ketchup"
        }}, {new:true});
        console.log(result);
    }
//updateOrder('64a827ed2957ba146174bcc6');

//Delete
async function removeOrder(id) {
    const result = await Order.deleteOne({
        _id: id
    });
    console.log(result);
}
//removeOrder('64a828dfb86b4a084f6aee6d');


//ENDPOINTS

// 1: GET /api/orders
router.get('/', async(req, res) => {
    const orders = await Order.find()
    res.send(orders)
});

// 2: GET /api/orders/:id
router.get('/:id', async(req, res) => {
    const order = await Order.findById(req.params.id);
    if(!order) return res.status(404).send('the order with the given id was not found');    
    res.send(order)
});

// 3 : POST /api/orders
router.post('/', async(req, res) => {
    const { error } = validateOrder(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    let order = new Order({
        customer: req.body.customer,
        dish: req.body.dish,
        date: Date.now()
    });
    order = await order.save();
    res.send(order);
});

// 4: PUT /api/orders/:id
router.put('/:id', async(req, res) => {
    const { error } = validateOrder(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    const order = await Order.findByIdAndUpdate(req.params.id,
        {customer: req.body.customer, 
        dish: req.body.dish},
        {new: true});
    if(!order) return res.status(404).send('the order with the given id was not found');
    res.send(order);
});

// 5: DELETE /api/orders/:id
router.delete('/:id', async(req, res) => {
    const order = await Order.findByIdAndRemove(req.params.id);
    if(!order) return res.status(404).send('the order with the given id was not found');
    res.send(order);
});


function validateOrder(order) {
    const schema = Joi.object({
        customer: Joi.string().min(3).required(),
        dish: Joi.string().min(3).required(),
    });
    return schema.validate(order);
};

module.exports = router;