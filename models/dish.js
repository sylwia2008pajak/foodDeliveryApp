const Joi = require('joi');
const { default: mongoose } = require('mongoose');
const {cuisineSchema, Cuisine} = require('./cuisine');
const validateObjectId = require('../middleware/validateObjectId');

const Dish = mongoose.model("Dish", new mongoose.Schema({
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
}));

function validateDish(dish) {
    const schema = Joi.object({
        name: Joi.string().min(2).required(),
        cuisineId: Joi.objectId().required(),
        ingredients: Joi.array().min(1).required(),
        calories: Joi.number().min(0).required(),
        price: Joi.number().min(0).required()
    });
    return schema.validate(dish);
};

// CRUD
//Create
async function createDish(cuisine) {
    try {
        const dish = new Dish({
            name: "Spaghetti",
            cuisine: cuisine,
            ingredients: ["Pasta", "Tomatoe saus"],
            calories: 500,
            price: 10
        });
        const result = await dish.save();
        console.log(result);
    } catch (err) {
        console.error('Error creating dish: ', err);
        throw err;
    }
}
//createDish(new Cuisine({name: 'Italian'}));

//Read
async function getDishes() {
    try {
        return await Dish.find();
    } catch (err) {
        console.error('Error getting dishes: ', err);
        throw err;
    }
async function run() {
    try {
        const dishes = await getDishes();
        console.log(dishes)
    } catch (err) {
        console.error('Error getting dishes: ', err);
        throw err;
    }
}
//run();

//Update
async function updateDish(id) {
    try {
        if(validateObjectId(id)) {
            const result = await Dish.findByIdAndUpdate(id,{
                $set: {
                    name: "Spaghetti",
                    'cuisine.name': 'French',
                    ingredients: ["Pasta", "Tomatoe saus", "Basilicum"],
                    calories: 510,
                    price: 11
                }}, {new:true});
            console.log(result);
        } else {
            console.log('Invalid objectId')
        }
    } catch (err) {
        console.error('Error updating dish: ', err);
        throw err;
    }        
    }
}
//updateDish('64b7b0025b095187e23b7641');

//Delete
async function removeDish(id) {
    try {
        if(validateObjectId(id)) {
        const result = await Dish.deleteOne({
            _id: id
        });
        console.log(result);
        } else {
            console.log('Invalid objectId')
        }
    } catch (err) {
        console.error('Error removing dish: ', err);
        throw err;
    }
}
//removeDish('64b7afd55188b59839217eba');

exports.Dish = Dish;
exports.validate = validateDish;