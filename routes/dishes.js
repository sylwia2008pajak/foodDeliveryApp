const express = require('express');
const router = express.Router();
const Joi = require('joi');
const { default: mongoose } = require('mongoose');

const dishes = [
    {id: 1, name: 'Pasta', ingredients: ["Tomatoe", "Cheese", "Flour"], calories: 800, price: 18},
    {id: 2, name: 'Ratatouille', ingredients: ["Tomatoe", "Eggplant", "Zucchini"], calories: 500, price: 16},
    {id: 3, name: 'Paella', ingredients: ["Rice", "Schrimps", "Tomatoe saus"], calories: 800, price: 18}
];

const dishSchema = new mongoose.Schema( {
    name: String,
    ingredients: [String],
    calories: Number,
    price: Number

});
const Dish = mongoose.model("Dish", dishSchema);

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
createDish();

//Read
async function getDishes() {
    return await Dish.find();
}
async function run() {
    const dishes = await getDishes();
    console.log(dishes)
}
run();

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
updateDish('64a823778f35bacfa1230946');

//Delete
async function removeDish(id) {
    const result = await Dish.deleteOne({
        _id: id
    });
    console.log(result);
}
removeDish('64a8243cf3439ae2593852bf');

//ENDPOINTS
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