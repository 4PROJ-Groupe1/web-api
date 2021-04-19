const express = require('express');
const router = express.Router();
const metier = require('./metier');

// @route GET api/stock/getInfosStock
// @access Public
router.get('/getInfosStock', (req, res) => {
    res.send('test route (GET) working')
});

module.exports = router;