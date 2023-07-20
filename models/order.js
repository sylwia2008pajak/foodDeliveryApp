const Joi = require('joi');
const { default: mongoose } = require('mongoose');
const {cuisineSchema} = require('./cuisine');
const validateObjectId = require('../middleware/validateObjectId');
const{Customer} = require('./customer');
const{Dish} = require('./dish');
const{Cuisine} = require('./cuisine');

const Order = mongoose.model("Order", new mongoose.Schema({
    customer: {
        type: new mongoose.Schema({
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
        }),
        required: true
    },
    dish: {
        type: new mongoose.Schema({
            name: {
                type: String,
                required: true,
                minlength: 2
            },
            cuisine: {
                type: cuisineSchema,
                required: true
            },
            ingredients: {
                type: Array,
                validate: {
                    validator: function (v) {
                        return v && v.length > 0;
                    },
                    message: 'A dish should have at least one ingredient.'
                }
            },
            calories: {
                type: Number,
                required: true,
                min: 0
            },
            price: {
                type: Number,
                required: true,
                min: 0
            }

        }),
        required: true
    },
    date: { 
        type: Date, 
        default: Date.now(),
    }
}));

function validateOrder(order) {
    const schema = Joi.object({
        customerId: Joi.objectId().required(),
        dishId: Joi.objectId().required(),
        date: Joi.date()
    });
    return schema.validate(order);
};


//CRUD
//Create
async function createOrder(customer, dish) {
    const order = new Order({
        customer: customer,
        dish: dish,
    });
    const result = await order.save();
    console.log(result);
}
//createOrder(new Customer({name: 'Test User', phone: '+32479000000'}), new Dish({name: 'dish1', cuisine: new Cuisine({name: "French"}), ingredients: ['ing1', 'ing2'], calories: 500, price: 20}));

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
    if(validateObjectId(id)){
        const result = await Order.findByIdAndUpdate(id,{
        $set: {
            'customer.name': "Test User Updated",
            'dish.ingredients': ['ing1']
        }}, {new:true});
        console.log(result);
    } else {
        console.log('Invalid objectId')
    }
}
//updateOrder('64b8f38d17342d339b6b6624');

//Delete
async function removeOrder(id) {
    if(validateObjectId(id)){
        const result = await Order.deleteOne({
        _id: id
    });
    console.log(result);
    } else {
        console.log('Invalid objectId')
    } 
}
//removeOrder('64b8f1a6d6eb7f188b5c1c36');

exports.Order = Order;
exports.validate = validateOrder;