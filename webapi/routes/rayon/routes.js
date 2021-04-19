const express = require('express');
const router = express.Router();
const metier = require('./metier');


// @route GET api/rayon/getInfosRayons
// @access Public
router.get('/getInfosRayons', (req, res) => {
    res.send('test route (GET) working')
});

module.exports = router;