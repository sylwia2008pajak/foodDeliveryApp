const mongoose = require('mongoose');
const express = require('express');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const app = express();
const customers = require('./routes/customers');
const cuisines = require('./routes/cuisines');
const dishes = require('./routes/dishes');
const orders = require('./routes/orders');
const home = require('./routes/home');
const users = require('./routes/users');
const auth = require('./routes/auth');
const config = require('config');

if (!config.get('jwtPrivateKey')){
  console.error('FATAL ERROR: jwtPrivateKey not defined');
  process.exit(1);
};

/* mongoose.connect('mongodb://127.0.0.1:27017/foodDelivery')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err)); */

mongoose.connect(config.get("db"))
  .then(() => console.log(`Connected to ${config.get('db')}`))
  .catch(err => console.error('Could not connect to MongoDB...', err));

app.use(express.json());

app.use('/api/customers', customers);
app.use('/api/cuisines', cuisines);
app.use('/api/dishes', dishes);
app.use('/api/orders', orders);
app.use('/', home);
app.use('/api/users', users);
app.use('/api/auth', auth);

const port = process.env.PORT || 3000;
const server = app.listen (port, () => console.log(`Listening on port ${port}...`));
module.exports = server;