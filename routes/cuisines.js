const {Cuisine, validate} = require('../models/cuisine');
const express = require('express');
const router = express.Router();
/* const Joi = require('joi'); */
const { default: mongoose } = require('mongoose');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

/* const cuisines = [
    {id: 1, name: 'Italian'},
    {id: 2, name: 'French'},
    {id: 3, name: 'Spanish'}
]; */

/* const cuisineSchema = new mongoose.Schema( {
    name: String
});
const Cuisine = mongoose.model("Cuisine", cuisineSchema);
 */

/* const Cuisine = mongoose.model('Cuisine', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3
    }
})); */


//CRUD
//Create
/* async function createCuisine() {
    const cuisine = new Cuisine({
        name: "Mexican"
    });
    const result = await cuisine.save();
    console.log(result);
}
createCuisine(); */

//Read
/* async function getCuisines() {
    return await Cuisine.find();
}
async function run() {
    const cuisines = await getCuisines();
    console.log(cuisines)
}
run(); */

//Update
/* async function updateCuisine(id) { */
/*     const cuisine = await Cuisine.findById(id);
    if(!cuisine) return;
    cuisine.set({
        name: 'Indian'
    });
    const result = await cuisine.save();
    console.log(result); */
/*     const result = await Cuisine.findByIdAndUpdate(id,{
        $set: {
            name: "Greek"
        }
    }, {new:true});
    console.log(result);
}
updateCuisine('64a7d2c759e7b5a9542b7788'); */

//Delete
/* async function removeCuisine(id) {
    const result = await Cuisine.deleteOne({
        _id: id
    });
    console.log(result);
}
removeCuisine('64a7d3c9f809ca8cd4c8af8b'); */


//ENDPOINTS

// 1: GET /api/cuisines
/* router.get('/', (req, res) => {
    res.send(cuisines)
}); */
router.get('/', async(req, res) => {
    const cuisines = await Cuisine.find();
    res.send(cuisines);
});

// 2: GET /api/cuisines/:id
/* router.get('/:id', (req, res) => {
    const cuisine = cuisines.find(c => c.id ===
        parseInt(req.params.id));
    if(!cuisine) return res.status(404).send('the cuisine with the given id was not found');    
    res.send(cuisine)
}); */

router.get('/:id', async(req, res) => {
    const cuisine = await Cuisine.findById(req.params.id);
    if(!cuisine) return res.status(404).send('the cuisine with the given id was not found');    
    res.send(cuisine);
});

// 3 : POST /api/cuisines
/* router.post('/', (req, res) => {
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
}); */
/* router.post('/', async(req, res) => {
    const { error } = validateCuisine(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    let cuisine = new Cuisine ({name: req.body.name});
    cuisine = await cuisine.save();
    res.send(cuisine);
}); */

router.post('/', auth, async(req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    let cuisine = new Cuisine ({name: req.body.name});
    cuisine = await cuisine.save();
    res.send(cuisine);
});
// 4: PUT /api/cuisines/:id
/* router.put('/:id', (req, res) => {
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
}); */

/* router.put('/:id', async(req, res) => {
    const { error } = validateCuisine(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    const cuisine = await Cuisine.findByIdAndUpdate(req.params.id,
    {name: req.body.name},{new: true});
    if (!cuisine) return res.status(404).send('the cuisine with the given id was not found');
    res.send(cuisine);
    }); */
    router.put('/:id', async(req, res) => {
        const { error } = validate(req.body);
        if(error) return res.status(400).send(error.details[0].message);
        const cuisine = await Cuisine.findByIdAndUpdate(req.params.id,
        {name: req.body.name},{new: true});
        if (!cuisine) return res.status(404).send('the cuisine with the given id was not found');
        res.send(cuisine);
    });

// 5: DELETE /api/cuisines/:id
/* router.delete('/:id', (req, res) => {
    const cuisine = cuisines.find(c => c.id ===
        parseInt(req.params.id));
    if(!cuisine) return res.status(404).send('the cuisine with the given id was not found');
        const index = cuisines.indexOf(cuisine);
        cuisines.splice(index, 1);
        res.send(cuisine);
}); */

router.delete('/:id', [auth, admin], async(req, res) => {
    const cuisine = await Cuisine.findByIdAndRemove(req.params.id);
    if(!cuisine) return res.status(404).send('the cuisine with the given id was not found');
    res.send(cuisine);
});

/* function validateCuisine(cuisine) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
    return schema.validate(cuisine);
}; */

module.exports = router;