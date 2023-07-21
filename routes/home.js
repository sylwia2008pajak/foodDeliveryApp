const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    try {
        res.send('Welkom op FoodDelivery');
    } catch (err) {
        console.error('Error occured: ', err);
        throw err;
    }
});

module.exports = router;