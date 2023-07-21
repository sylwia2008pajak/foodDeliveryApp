const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    try {
        res.render('index', { title: 'FoodDeliveryApp',
        message: 'Welkom op FoodDelivery'});
    } catch (err) {
        console.error('Error occured: ', err);
        throw err;
    }
});

module.exports = router;

