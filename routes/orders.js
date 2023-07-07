const express = require('express');
const router = express.Router();
const Joi = require('joi');
const { default: mongoose } = require('mongoose');

const orders = [
    {id: 1, customer: 'Max', dish:'Paella', date: "07.07.2023"},
    {id: 2, customer: 'Helen', dish:'Pasta', date: "07.07.2023"},
    {id: 3, customer: 'BLiss', dish:'Ratatouille', date: "07.07.2023"}
];

const orderSchema = new mongoose.Schema( {
    customer: String,
    dish: String,
    date: { type: Date, default: Date.now }
});
const Order = mongoose.model("Order", orderSchema);

//CRUD
//Create
async function createOrder() {
    const order = new Order({
        customer: "Maxwel",
        dish: "Hamburger"
    });
    const result = await order.save();
    console.log(result);
}
createOrder();

//Read
async function getOrders() {
    return await Order.find();
}
async function run() {
    const orders = await getOrders();
    console.log(orders)
}
run();

//Update
async function updateOrder(id) {
    const result = await Order.findByIdAndUpdate(id,{
        $set: {
            customer: "Maxwel",
            dish: "Hamburger wit no ketchup"
        }}, {new:true});
        console.log(result);
    }
updateOrder('64a827ed2957ba146174bcc6');

//Delete
async function removeOrder(id) {
    const result = await Order.deleteOne({
        _id: id
    });
    console.log(result);
}
removeOrder('64a828dfb86b4a084f6aee6d');

//ENDPOINTS
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