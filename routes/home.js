const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Welkom op FoodDelivery');
});

module.exports = router;