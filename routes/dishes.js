const express = require('express');
const router = express.Router();
const Joi = require('joi');
const { default: mongoose } = require('mongoose');


const Dish = mongoose.model("Dish", new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2
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
}));


//CRUD
//Create
async function createDish() {
    const dish = new Dish({
        name: "Spaghetti",
        ingredients: ["Pasta", "Tomatoe saus"],
        calories: 500,
        price: 10
    });
    const result = await dish.save();
    console.log(result);
}
//createDish();

//Read
async function getDishes() {
    return await Dish.find();
}
async function run() {
    const dishes = await getDishes();
    console.log(dishes)
}
//run();

//Update
async function updateDish(id) {
    const result = await Dish.findByIdAndUpdate(id,{
        $set: {
            name: "Spaghetti",
            ingredients: ["Pasta", "Tomatoe saus", "Basilicum"],
            calories: 510,
            price: 11
        }}, {new:true});
        console.log(result);
    }
//updateDish('64a823778f35bacfa1230946');

//Delete
async function removeDish(id) {
    const result = await Dish.deleteOne({
        _id: id
    });
    console.log(result);
}
//removeDish('64a8243cf3439ae2593852bf');


//ENDPOINTS

// 1: GET /api/dishes
router.get('/', async(req, res) => {
    const dishes = await Dish.find();
    res.send(dishes)
});

// 2: GET /api/dishes/:id
router.get('/:id', async(req, res) => {
    const dish = await Dish.findById(req.params.id);
    if(!dish) return res.status(404).send('the dish with the given id was not found');    
    res.send(dish)
});

// 3 : POST /api/dishes
router.post('/', async(req, res) => {
    const { error } = validateDish(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    let dish = new Dish(
        {name: req.body.name,
        ingredients: req.body.ingredients,
        calories: req.body.calories,
        price: req.body.price}
    );
    dish = await dish.save();
    res.send(dish);
});

// 4: PUT /api/dishes/:id
router.put('/:id', async(req, res) => {
    const { error } = validateDish(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    const dish = await Dish.findByIdAndUpdate(req.params.id,
        {name: req.body.name,
        ingredients: req.body.ingredients,
        calories: req.body.calories,
        price: req.body.price},
        {new: true});
    if(!dish) return res.status(404).send('the dish with the given id was not found');
    res.send(dish);
});

// 5: DELETE /api/dishes/:id
router.delete('/:id', async(req, res) => {
    const dish = await Dish.findByIdAndRemove(req.params.id);
    if(!dish) return res.status(404).send('the dish with the given id was not found');
    res.send(dish);
});


function validateDish(dish) {
    const schema = Joi.object({
        name: Joi.string().min(2).required(),
        ingredients: Joi.array().min(1).required(),
        calories: Joi.number().min(0).required(),
        price: Joi.number().min(0).required()
    });
    return schema.validate(dish);
};

module.exports = router;