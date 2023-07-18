const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const {Cuisine} = require('../models/cuisine');

const mongoose = require('mongoose');

let server;

describe('/api/cuisines', () => {
    beforeEach(() => { server = require('../index');})
    afterEach(async () => {
        server.close();
        await Cuisine.deleteMany({});
    });


const userToken ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGI1MjYxNzFmZTQyNWZlMGFiMDU3YzEiLCJpYXQiOjE2ODk1OTMzNjh9.Df5fi55UEuiPL56rpO38P5sSL7EHu556tziQNLzl3M8'
const adminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGFmZmY3ZWU0OGRiOWE2MGUwZjU0MmUiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE2ODk2ODY3Mjl9.B7GV35qUw05IxUapjqFh2EWRLEtzj_sT6K_9GazUtBU'
const invalidToken = 1;

describe('GET /', () => {
    it('OK, return all cuisines', async () => {
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
    });
});

describe('GET /:id', () => {
    let cuisine;
    let cuisineId = new mongoose.Types.ObjectId();
    beforeEach(async () => {
        cuisine = await Cuisine.create({name: 'Vietnamees'});
    });

    it('OK, return existing cuisine', async () => {
        const res = await request(server).get(`/api/cuisines/${cuisine.id}`);
        expect(res.status).to.deep.equal(200);
        expect(res.body.name).to.deep.equal('Vietnamees');
    });

    it('Fail, return status 404 when invalid id provided', async () => {
        const res = await request(server).get(`/api/cuisines/${cuisineId}`);
        expect(res.status).to.equal(404);
      });
});

describe('POST /', () => {
    it('OK, create new cuisine', async () => {
        const res = await request(server)
        .post('/api/cuisines')
        .set('x-auth-token', userToken)
        .send({name: 'Chineese'});
        expect(res.body.id).not.to.be.null;
        expect(res.body.name).to.deep.equal('Chineese');
    });

    it('Fail, no name provided', async () => {
        const res = await request(server)
        .post('/api/cuisines')
        .set('x-auth-token', userToken)
        .send({});
        expect(res.status).to.equal(400);
    });

    it('Fail, return status 401 when no token provided', async () => {
        const res = await request(server)
        .post('/api/cuisines')
        .send({name: 'Chineese'});
        expect(res.status).to.equal(401);
    });

    it('Fail, return status 400 when invalid token provided', async () => {
        const res = await request(server)
        .post('/api/cuisines')
        .set('x-auth-token', invalidToken)
        .send({name: 'Chineese'});
        expect(res.status).to.equal(400);
    });
});

describe('PUT /:id', () => {
    let cuisine;
    let cuisineId = new mongoose.Types.ObjectId();
    beforeEach(async () => {
        cuisine = await Cuisine.create({name: 'Vietnamees'});
    });

    it('OK, update existing cuisine', async () => {
        const res = await request(server)
        .put(`/api/cuisines/${cuisine.id}`)
        .set('x-auth-token', userToken)
        .send({name: 'Updated Vietnamees'});
        expect(res.status).to.equal(200);
        expect(res.body.name).to.deep.equal('Updated Vietnamees');
    });

    it('Fail, no name provided', async () => {
        const res = await request(server)
        .put(`/api/cuisines/${cuisine.id}`)
        .set('x-auth-token', userToken)
        .send({});
    expect(res.status).to.equal(400);
    });

    it('Fail, return status 404 when invalid id provided', async () => {
        const res = await request(server)
        .put(`/api/cuisines/${cuisineId}`)
        .set('x-auth-token', userToken)
        .send({name: 'Updated Vietnamees'});
        expect(res.status).to.equal(404);
      });

    it('Fail, return status 401 when no token provided', async () => {
        const res = await request(server)
        .put(`/api/cuisines/${cuisine.id}`)
        .send({name: 'Updated Vietnamees'});
        expect(res.status).to.equal(401);
    });

    it('Fail, return status 400 when invalid token provided', async () => {
        const res = await request(server)
        .put(`/api/cuisines/${cuisine.id}`)
        .set('x-auth-token', invalidToken)
        .send({name: 'Updated Vietnamees'});
        expect(res.status).to.equal(400);
    });
});

describe('DELETE /:id', () => {
    let cuisine;
    let cuisineId = new mongoose.Types.ObjectId();

    beforeEach(async () => {
        cuisine = await Cuisine.create({name: 'Vietnamees'});
    });

    it('OK, delete existing cuisine', async () => {
        const res = await request(server)
        .delete(`/api/cuisines/${cuisine.id}`)
        .set('x-auth-token', adminToken)
        .send({name: 'Vietnamees'});
        expect(res.status).to.equal(200);
        expect(res.body.name).to.deep.equal('Vietnamees');
        const loadedCuisine = await Cuisine.findById(cuisine.id);
        expect(loadedCuisine).to.be.null;
    });

    it('Fail, return status 404 when invalid id provided', async () => {
        const res = await request(server).delete(`/api/cuisines/${cuisineId}`)
        .set('x-auth-token', adminToken)
        .send({name: 'Vietnamees'});
        expect(res.status).to.equal(404);
      });
    
    it('Fail, return status 400 when invalid token provided', async () => {
        const res = await request(server)
        .delete(`/api/cuisines/${cuisine.id}`)
        .set('x-auth-token', invalidToken)
        .send({name: 'Vietnamees'});
        expect(res.status).to.equal(400);
    });

    it('Fail, return status 401 when no token provided', async () => {
        const res = await request(server)
        .delete(`/api/cuisines/${cuisine.id}`)
        .send({name: 'Vietnamees'});
        expect(res.status).to.equal(401);
    });

    it('Fail, return status 403 when unauthorised token provided', async () => {
        const res = await request(server)
        .delete(`/api/cuisines/${cuisine.id}`)
        .set('x-auth-token', userToken)
        .send({name: 'Vietnamees'});
        expect(res.status).to.equal(403);
    });

});

});

