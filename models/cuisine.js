const Joi = require('joi');
const { default: mongoose } = require('mongoose');
const id = new mongoose.Types.ObjectId();
console.log(id);
const isValid = mongoose.Types.ObjectId.isValid(id);
console.log(isValid);

const cuisineSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3
    }
});

const Cuisine = mongoose.model('Cuisine', cuisineSchema);

async function removeCuisine(id) {
    const result = await Cuisine.deleteOne({
        _id: id
    });
    console.log(result);
}
//removeCuisine('64a7d3c9f809ca8cd4c8af8b');



function validateCuisine(cuisine) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
    return schema.validate(cuisine);
};

exports.cuisineSchema = cuisineSchema;
exports.Cuisine = Cuisine;
exports.validate = validateCuisine;