const {Dish, validate} = require('../models/dish');
const {Cuisine} = require('../models/cuisine');
const express = require('express');
const router = express.Router();
const { default: mongoose } = require('mongoose');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');


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
router.post('/', auth, async(req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    const cuisine = await Cuisine.findById(req.body.cuisineId);
    if(!cuisine) return res.status(400).send('Invalid cuisine.');
    const dish = new Dish(
        {name: req.body.name,
        cuisine: {
            _id: cuisine._id,
            name: cuisine.name
        },
        ingredients: req.body.ingredients,
        calories: req.body.calories,
        price: req.body.price}
    );
    await dish.save();
    res.send(dish);
});

// 4: PUT /api/dishes/:id
router.put('/:id', auth, async(req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    const cuisine = await Cuisine.findById(req.body.cuisineId);
    if(!cuisine) return res.status(400).send('Invalid cuisine');
    
    const dish = await Dish.findByIdAndUpdate(req.params.id,
        {name: req.body.name,
        ingredients: req.body.ingredients,
        cuisine: {
            _id: cuisine._id,
            name: cuisine.name
        },
        calories: req.body.calories,
        price: req.body.price},
        {new: true});
    if(!dish) return res.status(404).send('the dish with the given id was not found');
    res.send(dish);
});

// 5: DELETE /api/dishes/:id
router.delete('/:id', [auth, admin], async(req, res) => {
    const dish = await Dish.findByIdAndRemove(req.params.id);
    if(!dish) return res.status(404).send('the dish with the given id was not found');
    res.send(dish);
});

module.exports = router;