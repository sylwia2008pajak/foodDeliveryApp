const {Cuisine, validate} = require('../models/cuisine');
const express = require('express');
const router = express.Router();
const { default: mongoose } = require('mongoose');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');


//ENDPOINTS

// 1: GET /api/cuisines
router.get('/', async(req, res) => {
    try {
        const cuisines = await Cuisine.find();
        res.send(cuisines);
    } catch (err) {
        console.error('Error getting cuisines: ', err);
        throw err;
    }
});

// 2: GET /api/cuisines/:id
router.get('/:id', async(req, res) => {
    try {
        const cuisine = await Cuisine.findById(req.params.id);
        if(!cuisine) return res.status(404).send('the cuisine with the given id was not found');    
        res.send(cuisine);
    } catch (err) {
        console.error('Error getting cuisine: ', err);
        throw err;
    }
});

// 3 : POST /api/cuisines
router.post('/', auth, async(req, res) => {
    try {
        const { error } = validate(req.body);
        if(error) return res.status(400).send(error.details[0].message);
        let cuisine = new Cuisine ({name: req.body.name});
        cuisine = await cuisine.save();
        res.send(cuisine);
    } catch (err) {
        console.error('Error creating cuisine: ', err);
        throw err;
    }
});

// 4: PUT /api/cuisines/:id
router.put('/:id', auth, async(req, res) => {
    try {
        const { error } = validate(req.body);
        if(error) return res.status(400).send(error.details[0].message);
        const cuisine = await Cuisine.findByIdAndUpdate(req.params.id, {name: req.body.name}, {new: true});
        if (!cuisine) return res.status(404).send('the cuisine with the given id was not found');
        res.send(cuisine);
    } catch (err) {
        console.error('Error updating cuisine: ', err);
        throw err;
    }
});

// 5: DELETE /api/cuisines/:id
router.delete('/:id', [auth, admin], async(req, res) => {
    try {
        const cuisine = await Cuisine.findByIdAndRemove(req.params.id);
        if(!cuisine) return res.status(404).send('the cuisine with the given id was not found');
        res.send(cuisine);
    } catch (err) {
        console.error('Error removing cuisine: ', err);
        throw err;
    }
});

module.exports = router;