const express = require('express');
const router = express.Router();
const Joi = require('joi');

const cuisines = [
    {id: 1, name: 'Italian'},
    {id: 2, name: 'French'},
    {id: 3, name: 'Spanish'}
];

//1
router.get('/', (req, res) => {
    res.send(cuisines)
});

//2
router.get('/:id', (req, res) => {
    const cuisine = cuisines.find(c => c.id ===
        parseInt(req.params.id));
    if(!cuisine) return res.status(404).send('the cuisine with the given id was not found');    
    res.send(cuisine)
});

//3
router.post('/', (req, res) => {
    const result = validateCuisine(req.body);
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }
    const cuisine = {
        id: cuisines.length +1,
        name: req.body.name
    };
    cuisines.push(cuisine);
    res.send(cuisine);
});

//4
router.put('/:id', (req, res) => {
    const cuisine = cuisines.find(c => c.id ===
        parseInt(req.params.id));
    if(!cuisine) return res.status(404).send('the cuisine with the given id was not found');
    const result = validateCuisine(req.body);
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }
    cuisine.name = req.body.name;
    res.send(cuisine);
});

//5
router.delete('/:id', (req, res) => {
    const cuisine = cuisines.find(c => c.id ===
        parseInt(req.params.id));
    if(!cuisine) return res.status(404).send('the cuisine with the given id was not found');
        const index = cuisines.indexOf(cuisine);
        cuisines.splice(index, 1);
        res.send(cuisine);
});

function validateCuisine(cuisine) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
    return schema.validate(cuisine);
};

module.exports = router;