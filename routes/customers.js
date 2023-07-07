const express = require('express');
const router = express.Router();
const Joi = require('joi');
const { default: mongoose } = require('mongoose');

const customers = [
    {id: 1, name: 'Jan', phone: '+32555223366', email: "aaa@gmail.com"},
    {id: 2, name: 'Max', phone: '+32777223366', email: "bbb@gmail.com"},
    {id: 3, name: 'Laura', phone: '+32888223366', email: "ccc@gmail.com"}
];


const customerSchema = new mongoose.Schema( {
    name: String,
    phone: String,
    email: String
});
const Customer = mongoose.model("Customer", customerSchema);

//CRUD
//Create
async function createCustomer() {
    const customer = new Customer({
        name: "Filip",
        phone: "+48513736721",
        email: "ddd@gmail.com"
    });
    const result = await customer.save();
    console.log(result);
}
createCustomer();

//Read
async function getCustomers() {
    return await Customer.find();
}
async function run() {
    const customers = await getCustomers();
    console.log(customers)
}
run();

//Update
async function updateCustomer(id) {
    const result = await Customer.findByIdAndUpdate(id,{
        $set: {
            name: "Michal",
            phone: "+48555555555",
            email: "kkk@hotmail.com"
        }}, {new:true});
        console.log(result);
    }
updateCustomer('64a82052172698735cf5930c');

//Delete
async function removeCustomer(id) {
    const result = await Customer.deleteOne({
        _id: id
    });
    console.log(result);
}
removeCustomer('64a81ffba3d54b0418c665f4')

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
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email
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
    customer.phone = req.body.phone;
    customer.email = req.body.email;
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
        name: Joi.string().min(3).required(),
        phone: Joi.string().min(12).required(),
        email: Joi.string().email().required()
    });
    return schema.validate(customer);
};

module.exports = router;