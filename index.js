const express = require('express');
const app = express();
const Joi = require('joi');
const customers = require('./routes/customers')
const home = require('./routes/home')

app.use(express.json());
app.use('/api/customers', customers);
app.use('/', home);






const port = process.env.PORT || 3000;
app.listen (port, () => console.log(`Listening on
port ${port}...`));