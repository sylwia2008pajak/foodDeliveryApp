const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const {Cuisine} = require('../models/cuisine');

let server;

describe('/api/cuisines', () => {
    beforeEach(() => { server = require('../index');})
    afterEach(async () => {
        server.close();
        await Cuisine.deleteMany({})
    });


//const token ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGI1MjYxNzFmZTQyNWZlMGFiMDU3YzEiLCJpYXQiOjE2ODk1OTMzNjh9.Df5fi55UEuiPL56rpO38P5sSL7EHu556tziQNLzl3M8'

describe('GET /', () => {
    it('should return all cuisines', async () => {
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

    it('works', async () => {
        const res = await request(server).get(`/api/cuisines/${cuisine.id}`);
        expect(res.status).to.deep.equal(200);
        expect(res.body.name).to.deep.equal('Vietnamees');
    });

    it('returns status 404 when not found', async () => {
        const res = await request(server).get(`/api/cuisines/${cuisineId}`);
        expect(res.status).to.equal(404);
      });
})

});