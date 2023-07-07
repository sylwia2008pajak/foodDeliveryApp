const express = require('express');
const router = express.Router();
const Joi = require('joi');

const dishes = [
    {id: 1, name: 'Pasta', ingredients: ["Tomatoe", "Cheese", "Flour"], calories: 800, price: 18},
    {id: 2, name: 'Ratatouille', ingredients: ["Tomatoe", "Eggplant", "Zucchini"], calories: 500, price: 16},
    {id: 3, name: 'Paella', ingredients: ["Rice", "Schrimps", "Tomatoe saus"], calories: 800, price: 18}
];

//1
router.get('/', (req, res) => {
    res.send(dishes)
});

//2
router.get('/:id', (req, res) => {
    const dish = dishes.find(c => c.id ===
        parseInt(req.params.id));
    if(!dish) return res.status(404).send('the dish with the given id was not found');    
    res.send(dish)
});

//3
router.post('/', (req, res) => {
    const result = validateDish(req.body);
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }
    const dish = {
        id: dishes.length +1,
        name: req.body.name,
        ingredients: req.body.ingredients,
        calories: req.body.calories,
        price: req.body.price
    };
    dishes.push(dish);
    res.send(dish);
});

//4
router.put('/:id', (req, res) => {
    const dish = dishes.find(c => c.id ===
        parseInt(req.params.id));
    if(!dish) return res.status(404).send('the dish with the given id was not found');
    const result = validateDish(req.body);
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }
    dish.name = req.body.name;
    dish.ingredients = req.body.ingredients;
    dish.calories = req.body.calories;
    dish.price = req.body.price;
    res.send(dish);
});

//5
router.delete('/:id', (req, res) => {
    const dish = dishes.find(c => c.id ===
        parseInt(req.params.id));
    if(!dish) return res.status(404).send('the dish with the given id was not found');
        const index = dishes.indexOf(dish);
        dishes.splice(index, 1);
        res.send(dish);
});

function validateDish(dish) {
    const schema = Joi.object({
        name: Joi.string().min(2).required(),
        ingredients: Joi.array().required(),
        calories: Joi.number().min(0).required(),
        price: Joi.number().min(0).required()
    });
    return schema.validate(dish);
};

module.exports = router;