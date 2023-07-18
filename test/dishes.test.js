const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const {Cuisine} = require('../models/cuisine');
const {Dish} = require('../models/dish');

const mongoose = require('mongoose');

let server;

describe('/api/dishes', () => {
    beforeEach(() => { server = require('../index');})
    afterEach(async () => {
        server.close();
        await Dish.deleteMany({});
    });


const userToken ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGI1MjYxNzFmZTQyNWZlMGFiMDU3YzEiLCJpYXQiOjE2ODk1OTMzNjh9.Df5fi55UEuiPL56rpO38P5sSL7EHu556tziQNLzl3M8'
const adminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGFmZmY3ZWU0OGRiOWE2MGUwZjU0MmUiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE2ODk2ODY3Mjl9.B7GV35qUw05IxUapjqFh2EWRLEtzj_sT6K_9GazUtBU'
const invalidToken = 1;

describe('GET /', () => {
    let cuisine;
    beforeEach(async () => {
        cuisine = await Cuisine.create({name: 'Vietnamees'});
    });

    it('OK, return all dishes', async () => {
        await Dish.collection.insertMany([
            {name: 'dish1', cuisineId: cuisine.id, ingredients: ['ing1', 'ing2'], calories: 500, price: 20},
            {name: 'dish2', cuisineId: cuisine.id, ingredients: ['ing1', 'ing2'], calories: 500, price: 20}
        ]);

        const res = await request(server).get('/api/dishes');

        expect(res.status).to.deep.equal(200);
        expect(res.body.length).to.deep.equal(2);
        expect(res.body.some(c => c.name === 'dish1')).to.be.true;
        expect(res.body.some(c => c.name === 'dish2')).to.be.true;
    });
});


});