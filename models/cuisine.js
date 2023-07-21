const Joi = require('joi');
const { default: mongoose } = require('mongoose');
const validateObjectId = require('../middleware/validateObjectId');


const cuisineSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3
    }
});

const Cuisine = mongoose.model('Cuisine', cuisineSchema);

function validateCuisine(cuisine) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
    return schema.validate(cuisine);
};


// CRUD
//Create
async function createCuisine() {
    try {
        const cuisine = new Cuisine({
            name: "Mexican"
        });
        const result = await cuisine.save();
        console.log(result);
    } catch (err) {
        console.err('Error creating cuisine: ', err);
        throw err;
    }
}
//createCuisine();

//Read
async function getCuisines() {
    try {
        return await Cuisine.find();
    } catch (err) {
        console.error('Error getting cuisines: ', err);
        throw err;
    }
}

async function run() {
    try {
        const cuisines = await getCuisines();
        console.log(cuisines)
    } catch (err) {
        console.error('Error getting cuisines: ', err);
        throw err;
    }
}
//run();

//Update
async function updateCuisine(id) {
    try {
        if(validateObjectId(id)) {
        const result = await Cuisine.findByIdAndUpdate(id,{
            $set: {
                name: "Greek"
            }
        }, {new:true});
        console.log(result);
        } else {
            console.log('Invalid objectId')
        }
    } catch (err) {
        console.error('Error updating cuisine: ', err);
        throw err;
    }
}
//updateCuisine('64b7aa7c6359e51b5a03b544');

//Delete
async function removeCuisine(id) {
    try {
        if(validateObjectId(id)) {
        const result = await Cuisine.deleteOne({
            _id: id
        });
        console.log(result);
        } else {
            console.log('Invalid objectId');
        }
    } catch (err) {
        console.error('Error removing cuisine: ', err);
        throw err;
    }
}
//removeCuisine('64b7aa7c6359e51b5a03b544');

exports.cuisineSchema = cuisineSchema;
exports.Cuisine = Cuisine;
exports.validate = validateCuisine;