const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const {Cuisine} = require('../models/cuisine');
const {Dish} = require('../models/dish');
const {Customer} = require('../models/customer');
const {Order} = require('../models/order');
const {User} = require('../models/user');

const mongoose = require('mongoose');

let server;
let cuisine;
let cuisineId = new mongoose.Types.ObjectId();
let dish;
let dishUpdated;
let dishId = new mongoose.Types.ObjectId();
let customer;
let customerId = new mongoose.Types.ObjectId();
let order;
let orderId = new mongoose.Types.ObjectId();
let user;

const userToken ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGI1MjYxNzFmZTQyNWZlMGFiMDU3YzEiLCJpYXQiOjE2ODk1OTMzNjh9.Df5fi55UEuiPL56rpO38P5sSL7EHu556tziQNLzl3M8'
const adminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGFmZmY3ZWU0OGRiOWE2MGUwZjU0MmUiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE2ODk2ODY3Mjl9.B7GV35qUw05IxUapjqFh2EWRLEtzj_sT6K_9GazUtBU'
const invalidToken = 1;


//CUISINES

describe('/api/cuisines', () => {
    beforeEach(() => { server = require('../index');})
    afterEach(async () => {
        server.close();
        await Cuisine.deleteMany({});
    });

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

    it('Fail, return status 404 when provided id not found', async () => {
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
        try{
            const res = await request(server)
            .post('/api/cuisines')
            .send({name: 'Chineese'});
            expect(res.status).to.equal(401);
        } catch (err) {
            console.error('Error occured: ', err);
            throw err;
        }
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

    it('Fail, return status 404 when provided id not found', async () => {
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

    it('Fail, return status 404 when provided id not found', async () => {
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

    it('Fail, return status 404 when provided id not found', async () => {
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

     it('Fail, return status 404 when provided id not found', async () => {
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

     it('Fail, return status 404 when provided id not found', async () => {
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


//CUSTOMERS

describe('/api/customers', () => {
    beforeEach(() => { server = require('../index');})
    afterEach(async () => {
        server.close();
        await Customer.deleteMany({});
    });

describe('GET /', () => {
    it('OK, return all customers', async () => {
        try{
            await Customer.collection.insertMany([
                {name: 'Test User', phone: '+32479000000'},
                {name: 'Test User2', phone: '+32479000000'}             
            ]);
        const res = await request(server).get('/api/customers');
        expect(res.status).to.deep.equal(200);
        expect(res.body.length).to.deep.equal(2);
        expect(res.body.some(c => c.name === 'Test User')).to.be.true;
        expect(res.body.some(c => c.name === 'Test User2')).to.be.true;
        } catch (err) {
            console.error('Error occured: ', err);
            throw err;
        }
    });
});

describe('GET /:id', () => {  
    beforeEach(async () => {
        customer = await Customer.create({name: 'Test User', phone: '+32479000000'});
    });

    it('OK, return existing customer', async () => {
        try{
            const res = await request(server).get(`/api/customers/${customer.id}`);
            expect(res.status).to.deep.equal(200);
            expect(res.body.name).to.deep.equal('Test User');
        } catch (err) {
            console.error('Error occured: ', err);
            throw err;
        }
    });

    it('Fail, return status 404 when provided id not found', async () => {
        try{
            const res = await request(server)
            .get(`/api/customers/${customerId}`);
            expect(res.status).to.equal(404);
        } catch (err) {
            console.error('Error occured: ', err);
            throw err;
        }
    });
});

describe('POST /', () => {
    it('OK, create new customer', async () => {
        try{
            const res = await request(server)
            .post('/api/customers')
            .set('x-auth-token', userToken)
            .send({name: 'Test User', phone: '+32479000000'});
            expect(res.body.id).not.to.be.null;
            expect(res.body.name).to.deep.equal('Test User');
        } catch (err) {
            console.error('Error occured: ', err);
            throw err;
        }
    });

    it('Fail, no name provided', async () => {
        try{
            const res = await request(server)
            .post('/api/customers')
            .set('x-auth-token', userToken)
            .send({phone: '+32479000000'});
            expect(res.status).to.equal(400);
        } catch (err) {
            console.error('Error occured: ', err);
            throw err;
        }
    });

    it('Fail, no phone provided', async () => {
        try{
            const res = await request(server)
            .post('/api/customers')
            .set('x-auth-token', userToken)
            .send({name: 'Test User'});
            expect(res.status).to.equal(400);
        } catch (err) {
            console.error('Error occured: ', err);
            throw err;
        }
    });

    it('Fail, return status 401 when no token provided', async () => {
        try{
            const res = await request(server)
            .post('/api/customers')
            .send({name: 'Test User', phone: '+32479000000'});
            expect(res.status).to.equal(401);
        } catch (err) {
            console.error('Error occured: ', err);
            throw err;
        }
    });

    it('Fail, return status 400 when invalid token provided', async () => {
        try{
            const res = await request(server)
            .post('/api/customers')
            .set('x-auth-token', invalidToken)
            .send({name: 'Test User', phone: '+32479000000'});
            expect(res.status).to.equal(400);
        } catch (err) {
            console.error('Error occured: ', err);
            throw err;
        }    
    });  
});

describe('PUT /:id', () => {
    beforeEach(async () => {
        customer = await Customer.create({name: 'Test User', phone: '+32479000000'});
    });

    it('OK, update existing customer', async () => {
        try{
           const res = await request(server)
            .put(`/api/customers/${customer.id}`)
            .set('x-auth-token', userToken)
            .send({name: 'Updated Test User', phone: '+32479000000'});
            expect(res.status).to.equal(200);
            expect(res.body.name).to.deep.equal('Updated Test User');
        } catch (err) {
            console.error('Error occured: ', err);
            throw err;
        }
    });

    it('Fail, no data provided', async () => {
        try{
            const res = await request(server)
            .put(`/api/customers/${customer.id}`)
            .set('x-auth-token', userToken)
            .send({});
            expect(res.status).to.equal(400);
        } catch (err) {
            console.error('Error occured: ', err);
            throw err;
        }
    });

    it('Fail, return status 404 when provided id not found', async () => {
        try{
            const res = await request(server)
            .get(`/api/customers/${customerId}`)
            .set('x-auth-token', userToken)
            .send({name: 'Updated Test User'});
            expect(res.status).to.equal(404);
        } catch (err) {
            console.error('Error occured: ', err);
            throw err;
        }
    });

    it('Fail, return status 401 when no token provided', async () => {
        try{
            const res = await request(server)
            .put(`/api/customers/${customer.id}`)
            .send({name: 'Updated Test User'});
            expect(res.status).to.equal(401);
        } catch (err) {
            console.error('Error occured: ', err);
            throw err;
        }
    });

    it('Fail, return status 400 when invalid token provided', async () => {
        try{
            const res = await request(server)
            .put(`/api/customers/${customer.id}`)
            .set('x-auth-token', invalidToken)
            .send({name: 'Updated Test User'});
            expect(res.status).to.equal(400);
        } catch (err) {
            console.error('Error occured: ', err);
            throw err;
        }
    });
});

describe('DELETE /:id', () => {   
    beforeEach(async () => {
        customer = await Customer.create({name: 'Test User', phone: '+32479000000'});
    });

    it('OK, delete existing customer', async () => {
        try{
            const res = await request(server)
            .delete(`/api/customers/${customer.id}`)
            .set('x-auth-token', adminToken)
            .send({name: 'Test User', phone: '+32479000000'});
            expect(res.status).to.equal(200);
            expect(res.body.name).to.deep.equal('Test User');
            const loadedCustomer = await Customer.findById(customer.id);
            expect(loadedCustomer).to.be.null;
        } catch (err) {
            console.error('Error occured: ', err);
            throw err;
        }
    });

    it('Fail, return status 404 when provided id not found', async () => {
        try{
            const res = await request(server).delete(`/api/customers/${customerId}`)
            .set('x-auth-token', adminToken)
            .send({name: 'Test User', phone: '+32479000000'});
            expect(res.status).to.equal(404);
        } catch (err) {
        console.error('Error occured: ', err);
        throw err;
        }
    });
    
    it('Fail, return status 400 when invalid token provided', async () => {
        try{
            const res = await request(server)
            .delete(`/api/customers/${customer.id}`)
            .set('x-auth-token', invalidToken)
            .send({name: 'Test User', phone: '+32479000000'});
            expect(res.status).to.equal(400);
        } catch (err) {
            console.error('Error occured: ', err);
            throw err;
        }
    });

    it('Fail, return status 401 when no token provided', async () => {
        try{
            const res = await request(server)
            .delete(`/api/customers/${customer.id}`)
            .send({name: 'Test User', phone: '+32479000000'});
            expect(res.status).to.equal(401);
        } catch (err) {
            console.error('Error occured: ', err);
            throw err;
        }
    });

    it('Fail, return status 403 when unauthorised token provided', async () => {
        try{
            const res = await request(server)
            .delete(`/api/customers/${customer.id}`)
            .set('x-auth-token', userToken)
            .send({name: 'Test User', phone: '+32479000000'});
            expect(res.status).to.equal(403);
        } catch (err) {
            console.error('Error occured: ', err);
            throw err;
        }
    });
});
});


//ORDERS

describe('/api/orders', () => {
    beforeEach(() => { server = require('../index');})
    afterEach(async () => {
        server.close();
        await Dish.deleteMany({});
        await Cuisine.deleteMany({});
        await Customer.deleteMany({});
        await Order.deleteMany({});
    });

describe('GET /', () => {
    it('OK, return all orders', async () => {
        try{
            await Order.collection.insertMany([
                {customerId: customer.id, dishId: dish.id, date: Date.now()}      
            ]);
        const res = await request(server).get('/api/orders');
        expect(res.status).to.deep.equal(200);
        expect(res.body.length).to.deep.equal(1);
        } catch (err) {
            console.error('Error occured: ', err);
            throw err;
        }
    });
});

describe('GET /:id', () => {
    beforeEach(async () => {
        cuisine = await Cuisine.create({name: 'Vietnamees'});
        dish = await Dish.create({name: 'dish1', cuisine: cuisine, ingredients: ['ing1', 'ing2'], calories: 500, price: 20});
        customer = await Customer.create({name: 'Test User', phone: '+32479000000'});
        order = await Order.create({customer: customer, dish: dish, date: Date.now()});
    });

    it('OK, return existing order', async () => {
        try{
            const res = await request(server).get(`/api/orders/${order.id}`);
            expect(res.status).to.deep.equal(200);
            expect(res.body.customer.name).to.deep.equal('Test User');
        } catch (err) {
            console.error('Error occured: ', err);
            throw err;
        }
    });

    it('Fail, return status 404 when provided id not found', async () => {
        try{
            const res = await request(server).get(`/api/orders/${orderId}`);
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
        dish = await Dish.create({name: 'dish1', cuisine: cuisine, ingredients: ['ing1', 'ing2'], calories: 500, price: 20});
        customer = await Customer.create({name: 'Test User', phone: '+32479000000'});
    });

    it('OK, create new order', async () => {
        try{
            const res = await request(server)
            .post('/api/orders')
            .set('x-auth-token', userToken)
            .send({customerId: customer.id, dishId: dish.id, date: Date.now()});
            
            expect(res.body.id).not.to.be.null;
            expect(res.status).to.equal(200);
            expect(res.body.dish.name).to.deep.equal('dish1');
        } catch (err) {
            console.error('Error occured: ', err);
            throw err;
        }
    });

    it('Fail, no customer provided', async () => {
        try{
            const res = await request(server)
            .post('/api/orders')
            .set('x-auth-token', userToken)
            .send({dishId: dish.id});
            expect(res.status).to.equal(400);
        } catch (err) {
            console.error('Error occured: ', err);
            throw err;
        }
    });

    it('Fail, no dish provided', async () => {
        try{
            const res = await request(server)
            .post('/api/orders')
            .set('x-auth-token', userToken)
            .send({customerId: customer.id});
            expect(res.status).to.equal(400);
        } catch (err) {
            console.error('Error occured: ', err);
            throw err;
        }
    });
    
    it('Fail, return status 401 when no token provided', async () => {
        try{
            const res = await request(server)
            .post('/api/orders')
            .send({customerId: customer.id, dishId: dish.id, date: Date.now()});
            expect(res.status).to.equal(401);
        } catch (err) {
            console.error('Error occured: ', err);
            throw err;
        }
    });

    it('Fail, return status 400 when invalid token provided', async () => {
        try{
            const res = await request(server)
            .post('/api/orders')
            .set('x-auth-token', invalidToken)
            .send({customerId: customer.id, dishId: dish.id, date: Date.now()});
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
        dish = await Dish.create({name: 'dish1', cuisine: cuisine, ingredients: ['ing1', 'ing2'], calories: 500, price: 20});
        dishUpdated = await Dish.create({name: 'dishUpdated', cuisine: cuisine, ingredients: ['ing1', 'ing2', 'ing3'], calories: 600, price: 20});
        customer = await Customer.create({name: 'Test User', phone: '+32479000000'});
        order = await Order.create({customer: customer, dish: dish, date: Date.now()});
    });

    it('OK, update existing order', async () => {
        try{
            const res = await request(server)
            .put(`/api/orders/${order.id}`)
            .set('x-auth-token', userToken)
            .send({customerId: customer.id, dishId: dishUpdated.id});
            expect(res.status).to.equal(200);
            expect(res.body.dish.name).to.deep.equal('dishUpdated');
        } catch (err) {
            console.error('Error occured: ', err);
            throw err;
        }
    });

    it('Fail, no data provided', async () => {
        try{
            const res = await request(server)
            .put(`/api/orders/${order.id}`)
            .set('x-auth-token', userToken)
            .send({});
        expect(res.status).to.equal(400);
        } catch (err) {
            console.error('Error occured: ', err);
            throw err;
        }
    });

     it('Fail, return status 404 when provided id not found', async () => {
        try{
            const res = await request(server)
            .put(`/api/orders/${orderId}`)
            .set('x-auth-token', userToken)
            .send({customerId: customer.id, dishId: dishUpdated.id});
            expect(res.status).to.equal(404);
        } catch (err) {
            console.error('Error occured: ', err);
            throw err;
        }
      });

    it('Fail, return status 401 when no token provided', async () => {
        try{
            const res = await request(server)
            .put(`/api/orders/${order.id}`)
            .send({customerId: customer.id, dishId: dishUpdated.id});
            expect(res.status).to.equal(401);
        } catch (err) {
            console.error('Error occured: ', err);
            throw err;
        }
    });

    it('Fail, return status 400 when invalid token provided', async () => {
        try{
            const res = await request(server)
            .put(`/api/orders/${order.id}`)
            .set('x-auth-token', invalidToken)
            .send({customerId: customer.id, dishId: dishUpdated.id});
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
        dish = await Dish.create({name: 'dish1', cuisine: cuisine, ingredients: ['ing1', 'ing2'], calories: 500, price: 20});
        customer = await Customer.create({name: 'Test User', phone: '+32479000000'});
        order = await Order.create({customer: customer, dish: dish, date: Date.now()});
    });

    it('OK, delete existing order', async () => {
        try{
            const res = await request(server)
            .delete(`/api/orders/${order.id}`)
            .set('x-auth-token', adminToken)
            .send({customerId: customer.id, dishId: dish.id});
            expect(res.status).to.equal(200);
            expect(res.body.dish.name).to.deep.equal('dish1');
            expect(res.body.customer.name).to.deep.equal('Test User');
            const loadedOrder = await Order.findById(order.id);
            expect(loadedOrder).to.be.null;
        } catch (err) {
            console.error('Error occured: ', err);
            throw err;
        }
    });

     it('Fail, return status 404 when provided id not found', async () => {
        try{
            const res = await request(server)
            .delete(`/api/orders/${orderId}`)
            .set('x-auth-token', adminToken)
            .send({customerId: customer.id, dishId: dish.id});
            expect(res.status).to.equal(404);
        } catch (err) {
            console.error('Error occured: ', err);
            throw err;
        }
      });
    
    it('Fail, return status 400 when invalid token provided', async () => {
        try{
            const res = await request(server)
            .delete(`/api/orders/${order.id}`)
            .set('x-auth-token', invalidToken)
            .send({customerId: customer.id, dishId: dish.id});
            expect(res.status).to.equal(400);
        } catch (err) {
            console.error('Error occured: ', err);
            throw err;
        }
    });

    it('Fail, return status 401 when no token provided', async () => {
        try{
            const res = await request(server)
            .delete(`/api/orders/${order.id}`)
            .send({customerId: customer.id, dishId: dish.id});
            expect(res.status).to.equal(401);
        } catch (err) {
            console.error('Error occured: ', err);
            throw err;
        }
    });

    it('Fail, return status 403 when unauthorised token provided', async () => {
        try{
            const res = await request(server)
            .delete(`/api/orders/${order.id}`)
            .set('x-auth-token', userToken)
            .send({customerId: customer.id, dishId: dish.id});
            expect(res.status).to.equal(403);
        } catch (err) {
            console.error('Error occured: ', err);
            throw err;
        }
    });
});
});


//USERS

describe('/api/users', () => {
    beforeEach(() => { server = require('../index');})
    afterEach(async () => {
        server.close();
        await User.deleteMany({});
    });

    describe('POST /', () => {
        it('OK, create new user', async () => {
            try{
                const res = await request(server)
                .post('/api/users')
                .send({name: 'Test User', email: 'testUser@gmail.com', password: '12345', isAdmin: true});
                expect(res.body.id).not.to.be.null;
                expect(res.body.name).to.deep.equal('Test User');
            } catch (err) {
                console.error('Error occured: ', err);
                throw err;
            }
        });
    
        it('Fail, no name provided', async () => {
            try{
                const res = await request(server)
                .post('/api/users')
                .send({email: 'testUser@gmail.com', password: '12345', isAdmin: true});
                expect(res.status).to.equal(400);
            } catch (err) {
                console.error('Error occured: ', err);
                throw err;
            }
        });
    
        it('Fail, no email provided', async () => {
            try{
                const res = await request(server)
                .post('/api/users')
                .send({name: 'Test User', password: '12345', isAdmin: true});
                expect(res.status).to.equal(400);
            } catch (err) {
                console.error('Error occured: ', err);
                throw err;
            }
        });
    });

    describe('GET /me', () => {     
        it('OK, return me', async () => {
            try{
                const res = await request(server)
                .get('/api/users/me')
                .set('x-auth-token', userToken)
                .send({userToken});
                expect(res.status).to.deep.equal(200);
            } catch (err) {
                console.error('Error occured: ', err);
                throw err;
            }
        });
    
        it('Fail, return status 400 when invalid token provided', async () => {
            try{
                const res = await request(server)
                .get('/api/users/me')
                .set('x-auth-token', invalidToken)
                .send({invalidToken});
                expect(res.status).to.equal(400);
            } catch (err) {
                console.error('Error occured: ', err);
                throw err;
            }
        });
    });
});

//AUTH

describe('/api/auth', () => {
    beforeEach(() => { server = require('../index');})
    afterEach(async () => {
        server.close();
        await User.deleteMany({});
    });

    describe('POST /', () => {
        beforeEach(async () => {
            user = await User.create({name: 'Test User', email: 'testUser@gmail.com', password: '12345', isAdmin: true});
        });
        it('OK auth', async () => {
            try{
                const res = await request(server)
                .post('/api/auth')
                .send({email: user.email, password: user.password});
                expect(res.body.id).not.to.be.null;
                expect(res.status).to.equal(400);
            } catch (err) {
                console.error('Error occured: ', err);
                throw err;
            }
        });
    
        it('Fail, no email provided', async () => {
            try{
                const res = await request(server)
                .post('/api/auth')
                .send({password: user.password});
                expect(res.status).to.equal(400);
            } catch (err) {
                console.error('Error occured: ', err);
                throw err;
            }
        });
    
        it('Fail, no password provided', async () => {
            try{
                const res = await request(server)
                .post('/api/auth')
                .send({email: user.email});
                expect(res.status).to.equal(400);
            } catch (err) {
                console.error('Error occured: ', err);
                throw err;
            }
        });
    });
});