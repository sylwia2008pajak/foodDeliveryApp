const express = require('express');
const router = express.Router();
const Joi = require('joi');
const { default: mongoose } = require('mongoose');

const cuisines = [
    {id: 1, name: 'Italian'},
    {id: 2, name: 'French'},
    {id: 3, name: 'Spanish'}
];

const cuisineSchema = new mongoose.Schema( {
    name: String
});
const Cuisine = mongoose.model("Cuisine", cuisineSchema);

//CRUD
//Create
async function createCuisine() {
    const cuisine = new Cuisine({
        name: "Mexican"
    });
    const result = await cuisine.save();
    console.log(result);
}
createCuisine();

//Read
async function getCuisines() {
    return await Cuisine.find();
}
async function run() {
    const cuisines = await getCuisines();
    console.log(cuisines)
}
run();

//Update
async function updateCuisine(id) {
/*     const cuisine = await Cuisine.findById(id);
    if(!cuisine) return;
    cuisine.set({
        name: 'Indian'
    });
    const result = await cuisine.save();
    console.log(result); */
    const result = await Cuisine.findByIdAndUpdate(id,{
        $set: {
            name: "Greek"
        }
    }, {new:true});
    console.log(result);
}
updateCuisine('64a7d2c759e7b5a9542b7788');

//Delete
async function removeCuisine(id) {
    const result = await Cuisine.deleteOne({
        _id: id
    });
    console.log(result);
}
removeCuisine('64a7d1b5d6602d4469a623a1')

//ENDPOINTS
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