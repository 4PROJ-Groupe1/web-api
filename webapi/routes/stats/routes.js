const express = require('express');
const router = express.Router();
const metier = require('./metier');

// @route GET api/stats
// @access Public
router.get('/', (req, res) => {
    res.send('test route (GET) working')
});

module.exports = router;