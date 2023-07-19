const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const {Cuisine} = require('../models/cuisine');
const {Dish} = require('../models/dish');

const mongoose = require('mongoose');

let server;
let cuisine;
let cuisineId = new mongoose.Types.ObjectId();
let dish;
let dishId = new mongoose.Types.ObjectId();

const userToken ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGI1MjYxNzFmZTQyNWZlMGFiMDU3YzEiLCJpYXQiOjE2ODk1OTMzNjh9.Df5fi55UEuiPL56rpO38P5sSL7EHu556tziQNLzl3M8'
const adminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGFmZmY3ZWU0OGRiOWE2MGUwZjU0MmUiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE2ODk2ODY3Mjl9.B7GV35qUw05IxUapjqFh2EWRLEtzj_sT6K_9GazUtBU'
const invalidToken = 1;

describe('/api/cuisines', () => {
    beforeEach(() => { server = require('../index');})
    afterEach(async () => {
        server.close();
        await Cuisine.deleteMany({});
    });

// CUISINES

describe('GET /', () => {
    it('OK, return all cuisines', async () => {
        try {
            await Cuisine.collection.insertMany([
            {name: 'cuisine1'},
            {name: 'cuisine2'},
            {name: 'cuisine3'}
        ]);
        const res = await request(server).get('/api/cuisines');
        expect(res.status).to.deep.equal(200);
        expect(res.body.length).to.deep.equal(3);
        expect(res.body.some(c => c.name === 'cuisine1')).to.be.true;
        expect(res.body.some(c => c.name === 'cuisine2')).to.be.true;
        expect(res.body.some(c => c.name === 'cuisine3')).to.be.true;        
    } catch (err) {
        console.error('Error occured: ', err);
        throw err;
    }
    });
});

describe('GET /:id', () => {  
    beforeEach(async () => {
        cuisine = await Cuisine.create({name: 'Vietnamees'});
    });

    it('OK, return existing cuisine', async () => {
        try{
            const res = await request(server).get(`/api/cuisines/${cuisine.id}`);
            expect(res.status).to.deep.equal(200);
            expect(res.body.name).to.deep.equal('Vietnamees');
        } catch (err) {
            console.error('Error occured: ', err);
            throw err;
        }
    });

    it('Fail, return status 404 when invalid id provided', async () => {
        try{
            const res = await request(server).get(`/api/cuisines/${cuisineId}`);
            expect(res.status).to.equal(404);
        } catch (err) {
            console.error('Error occured: ', err);
            throw err;
        }
    });
});

describe('POST /', () => {
    it('OK, create new cuisine', async () => {
        try{
            const res = await request(server)
            .post('/api/cuisines')
            .set('x-auth-token', userToken)
            .send({name: 'Chineese'});
            expect(res.body.id).not.to.be.null;
            expect(res.body.name).to.deep.equal('Chineese');
        } catch (err) {
            console.error('Error occured: ', err);
            throw err;
        }
    });

    it('Fail, no name provided', async () => {
        try{
            const res = await request(server)
            .post('/api/cuisines')
            .set('x-auth-token', userToken)
            .send({});
            expect(res.status).to.equal(400);
        } catch (err) {
            console.error('Error occured: ', err);
            throw err;
        }
    });

    it('Fail, return status 401 when no token provided', async () => {
        const res = await request(server)
        .post('/api/cuisines')
        .send({name: 'Chineese'});
        expect(res.status).to.equal(401);
    });

    it('Fail, return status 400 when invalid token provided', async () => {
        try{
            const res = await request(server)
            .post('/api/cuisines')
            .set('x-auth-token', invalidToken)
            .send({name: 'Chineese'});
            expect(res.status).to.equal(400);
        } catch (err) {
            console.error('Error occured: ', err);
            throw err;
        }    
    });  
});

describe('PUT /:id', () => {
    beforeEach(async () => {
        cuisine = await Cuisine.create({name: 'Vietnamees'});
    });

    it('OK, update existing cuisine', async () => {
        try{
           const res = await request(server)
            .put(`/api/cuisines/${cuisine.id}`)
            .set('x-auth-token', userToken)
            .send({name: 'Updated Vietnamees'});
            expect(res.status).to.equal(200);
            expect(res.body.name).to.deep.equal('Updated Vietnamees');
        } catch (err) {
            console.error('Error occured: ', err);
            throw err;
        }
    });

    it('Fail, no name provided', async () => {
        try{
            const res = await request(server)
            .put(`/api/cuisines/${cuisine.id}`)
            .set('x-auth-token', userToken)
            .send({});
            expect(res.status).to.equal(400);
        } catch (err) {
            console.error('Error occured: ', err);
            throw err;
        }
    });

    it('Fail, return status 404 when invalid id provided', async () => {
        try{
            const res = await request(server)
            .put(`/api/cuisines/${cuisineId}`)
            .set('x-auth-token', userToken)
            .send({name: 'Updated Vietnamees'});
            expect(res.status).to.equal(404);
        } catch (err) {
            console.error('Error occured: ', err);
            throw err;
        }
    });

    it('Fail, return status 401 when no token provided', async () => {
        try{
            const res = await request(server)
            .put(`/api/cuisines/${cuisine.id}`)
            .send({name: 'Updated Vietnamees'});
            expect(res.status).to.equal(401);
        } catch (err) {
            console.error('Error occured: ', err);
            throw err;
        }
    });

    it('Fail, return status 400 when invalid token provided', async () => {
        try{
            const res = await request(server)
            .put(`/api/cuisines/${cuisine.id}`)
            .set('x-auth-token', invalidToken)
            .send({name: 'Updated Vietnamees'});
            expect(res.status).to.equal(400);
        } catch (err) {
            console.error('Error occured: ', err);
            throw err;
        }
    });
});

describe('DELETE /:id', () => {   
    beforeEach(async () => {
        cuisine = await Cuisine.create({name: 'Vietnamees'});
    });

    it('OK, delete existing cuisine', async () => {
        try{
            const res = await request(server)
            .delete(`/api/cuisines/${cuisine.id}`)
            .set('x-auth-token', adminToken)
            .send({name: 'Vietnamees'});
            expect(res.status).to.equal(200);
            expect(res.body.name).to.deep.equal('Vietnamees');
            const loadedCuisine = await Cuisine.findById(cuisine.id);
            expect(loadedCuisine).to.be.null;
        } catch (err) {
            console.error('Error occured: ', err);
            throw err;
        }
    });

    it('Fail, return status 404 when invalid id provided', async () => {
        try{
            const res = await request(server).delete(`/api/cuisines/${cuisineId}`)
            .set('x-auth-token', adminToken)
            .send({name: 'Vietnamees'});
            expect(res.status).to.equal(404);
        } catch (err) {
        console.error('Error occured: ', err);
        throw err;
        }
    });
    
    it('Fail, return status 400 when invalid token provided', async () => {
        try{
            const res = await request(server)
            .delete(`/api/cuisines/${cuisine.id}`)
            .set('x-auth-token', invalidToken)
            .send({name: 'Vietnamees'});
            expect(res.status).to.equal(400);
        } catch (err) {
            console.error('Error occured: ', err);
            throw err;
        }
    });

    it('Fail, return status 401 when no token provided', async () => {
        try{
            const res = await request(server)
            .delete(`/api/cuisines/${cuisine.id}`)
            .send({name: 'Vietnamees'});
            expect(res.status).to.equal(401);
        } catch (err) {
            console.error('Error occured: ', err);
            throw err;
        }
    });

    it('Fail, return status 403 when unauthorised token provided', async () => {
        try{
            const res = await request(server)
            .delete(`/api/cuisines/${cuisine.id}`)
            .set('x-auth-token', userToken)
            .send({name: 'Vietnamees'});
            expect(res.status).to.equal(403);
        } catch (err) {
            console.error('Error occured: ', err);
            throw err;
        }
    });
});
});


//DISHES

describe('/api/dishes', () => {
    beforeEach(() => { server = require('../index');})
    afterEach(async () => {
        server.close();
        await Dish.deleteMany({});
        await Cuisine.deleteMany({});
    });

describe('GET /', () => {
    beforeEach(async () => {
        cuisine = await Cuisine.create({name: 'Vietnamees'});
    });

    it('OK, return all dishes', async () => {
        try{
            await Dish.collection.insertMany([
                {name: 'dish1', cuisineId: cuisine.id, ingredients: ['ing1', 'ing2'], calories: 500, price: 20},
                {name: 'dish2', cuisineId: cuisine.id, ingredients: ['ing1', 'ing2'], calories: 500, price: 20}             
            ]);
        const res = await request(server).get('/api/dishes');
        expect(res.status).to.deep.equal(200);
        expect(res.body.length).to.deep.equal(2);
        expect(res.body.some(c => c.name === 'dish1')).to.be.true;
        expect(res.body.some(c => c.name === 'dish2')).to.be.true;
        } catch (err) {
            console.error('Error occured: ', err);
            throw err;
        }
    });
});

describe('GET /:id', () => {
    beforeEach(async () => {
        cuisine = await Cuisine.create({name: 'Vietnamees'});
        dish = await Dish.create({name: 'dish1', cuisine: cuisine, ingredients: ['ing1', 'ing2'], calories: 500, price: 20})
    });

    it('OK, return existing dish', async () => {
        try{
            const res = await request(server).get(`/api/dishes/${dish.id}`);
            expect(res.status).to.deep.equal(200);
            expect(res.body.name).to.deep.equal('dish1');
        } catch (err) {
            console.error('Error occured: ', err);
            throw err;
        }
    });

    it('Fail, return status 404 when invalid id provided', async () => {
        try{
            const res = await request(server).get(`/api/dishes/${dishId}`);
            expect(res.status).to.equal(404);
        } catch (err) {
            console.error('Error occured: ', err);
            throw err;
        }
      });
});

describe('POST /', () => {
    beforeEach(async () => {
        cuisine = await Cuisine.create({name: 'Vietnamees'});
    });

    it('OK, create new dish', async () => {
        try{
            const res = await request(server)
            .post('/api/dishes')
            .set('x-auth-token', userToken)
            .send({name: 'dish1', cuisineId: cuisine.id, ingredients: ['ing1', 'ing2'], calories: 500, price: 20});
            expect(res.body.id).not.to.be.null;
            expect(res.status).to.equal(200);
            expect(res.body.name).to.deep.equal('dish1');
        } catch (err) {
            console.error('Error occured: ', err);
            throw err;
        }
    });

    it('Fail, no name provided', async () => {
        try{
            const res = await request(server)
            .post('/api/dishes')
            .set('x-auth-token', userToken)
            .send({cuisineId: cuisine.id, ingredients: ['ing1', 'ing2'], calories: 500, price: 20});
            expect(res.status).to.equal(400);
        } catch (err) {
            console.error('Error occured: ', err);
            throw err;
        }
    });

    it('Fail, no ingredients provided', async () => {
        try{
            const res = await request(server)
            .post('/api/dishes')
            .set('x-auth-token', userToken)
            .send({name: 'dish1', cuisineId: cuisine.id, ingredients: [], calories: 500, price: 20});
            expect(res.status).to.equal(400);
        } catch (err) {
            console.error('Error occured: ', err);
            throw err;
        }
    });
    
    it('Fail, return status 401 when no token provided', async () => {
        try{
            const res = await request(server)
            .post('/api/dishes')
            .send({name: 'dish1', cuisineId: cuisine.id, ingredients: ['ing1', 'ing2'], calories: 500, price: 20});
            expect(res.status).to.equal(401);
        } catch (err) {
            console.error('Error occured: ', err);
            throw err;
        }
    });

    it('Fail, return status 400 when invalid token provided', async () => {
        try{
            const res = await request(server)
            .post('/api/dishes')
            .set('x-auth-token', invalidToken)
            .send({name: 'dish1', cuisineId: cuisine.id, ingredients: ['ing1', 'ing2'], calories: 500, price: 20});
            expect(res.status).to.equal(400);
        } catch (err) {
            console.error('Error occured: ', err);
            throw err;
        }
    });
});

describe('PUT /:id', () => {
    beforeEach(async () => {
        cuisine = await Cuisine.create({name: 'Vietnamees'});
        dish = await Dish.create({name: 'dish1', cuisine: cuisine, ingredients: ['ing1', 'ing2'], calories: 500, price: 20})
    });

    it('OK, update existing dish', async () => {
        try{
            const res = await request(server)
            .put(`/api/dishes/${dish.id}`)
            .set('x-auth-token', userToken)
            .send({name: 'Updated dish1', cuisineId: cuisine.id, ingredients: ['ing1', 'ing2'], calories: 500, price: 20});
            expect(res.status).to.equal(200);
            expect(res.body.name).to.deep.equal('Updated dish1');
        } catch (err) {
            console.error('Error occured: ', err);
            throw err;
        }
    });

    it('Fail, no data provided', async () => {
        try{
            const res = await request(server)
            .put(`/api/dishes/${dish.id}`)
            .set('x-auth-token', userToken)
            .send({});
        expect(res.status).to.equal(400);
        } catch (err) {
            console.error('Error occured: ', err);
            throw err;
        }
    });

     it('Fail, return status 404 when invalid id provided', async () => {
        try{
            const res = await request(server)
            .put(`/api/dishes/${dishId}`)
            .set('x-auth-token', userToken)
            .send({name: 'Updated dish1', cuisineId: cuisine.id, ingredients: ['ing1', 'ing2'], calories: 500, price: 20});
            expect(res.status).to.equal(404);
        } catch (err) {
            console.error('Error occured: ', err);
            throw err;
        }
      });

    it('Fail, return status 401 when no token provided', async () => {
        try{
            const res = await request(server)
            .put(`/api/dishes/${dish.id}`)
            .send({name: 'Updated dish1', cuisineId: cuisine.id, ingredients: ['ing1', 'ing2'], calories: 500, price: 20});
            expect(res.status).to.equal(401);
        } catch (err) {
            console.error('Error occured: ', err);
            throw err;
        }
    });

    it('Fail, return status 400 when invalid token provided', async () => {
        try{
            const res = await request(server)
            .put(`/api/dishes/${dish.id}`)
            .set('x-auth-token', invalidToken)
            .send({name: 'Updated dish1', cuisineId: cuisine.id, ingredients: ['ing1', 'ing2'], calories: 500, price: 20});
            expect(res.status).to.equal(400);
        } catch (err) {
            console.error('Error occured: ', err);
            throw err;
        }
    });  
});

describe('DELETE /:id', () => {   
    beforeEach(async () => {
        cuisine = await Cuisine.create({name: 'Vietnamees'});
        dish = await Dish.create({name: 'dish1', cuisine: cuisine, ingredients: ['ing1', 'ing2'], calories: 500, price: 20})
    });

    it('OK, delete existing dish', async () => {
        try{
            const res = await request(server)
            .delete(`/api/dishes/${dish.id}`)
            .set('x-auth-token', adminToken)
            .send({name: 'dish1', cuisineId: cuisine.id, ingredients: ['ing1', 'ing2'], calories: 500, price: 20});
            expect(res.status).to.equal(200);
            expect(res.body.name).to.deep.equal('dish1');
            const loadedDish = await Dish.findById(dish.id);
            expect(loadedDish).to.be.null;
        } catch (err) {
            console.error('Error occured: ', err);
            throw err;
        }
    });

     it('Fail, return status 404 when invalid id provided', async () => {
        try{
            const res = await request(server).delete(`/api/dishes/${dishId}`)
            .set('x-auth-token', adminToken)
            .send({name: 'dish1', cuisineId: cuisine.id, ingredients: ['ing1', 'ing2'], calories: 500, price: 20});
            expect(res.status).to.equal(404);
        } catch (err) {
            console.error('Error occured: ', err);
            throw err;
        }
      });
    
    it('Fail, return status 400 when invalid token provided', async () => {
        try{
            const res = await request(server)
            .delete(`/api/dishes/${dish.id}`)
            .set('x-auth-token', invalidToken)
            .send({name: 'dish1', cuisineId: cuisine.id, ingredients: ['ing1', 'ing2'], calories: 500, price: 20});
            expect(res.status).to.equal(400);
        } catch (err) {
            console.error('Error occured: ', err);
            throw err;
        }
    });

    it('Fail, return status 401 when no token provided', async () => {
        try{
            const res = await request(server)
            .delete(`/api/dishes/${dish.id}`)
            .send({name: 'dish1', cuisineId: cuisine.id, ingredients: ['ing1', 'ing2'], calories: 500, price: 20});
            expect(res.status).to.equal(401);
        } catch (err) {
            console.error('Error occured: ', err);
            throw err;
        }
    });

    it('Fail, return status 403 when unauthorised token provided', async () => {
        try{
            const res = await request(server)
            .delete(`/api/dishes/${dish.id}`)
            .set('x-auth-token', userToken)
            .send({name: 'dish1', cuisineId: cuisine.id, ingredients: ['ing1', 'ing2'], calories: 500, price: 20});
            expect(res.status).to.equal(403);
        } catch (err) {
            console.error('Error occured: ', err);
            throw err;
        }
    });
});

});

