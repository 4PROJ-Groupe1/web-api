const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// @route GET api/test
// @description test
// @access Public
router.get('/', auth.authenticateJWT, (req, res) => {
    res.send('test route (GET) working')
});

module.exports = router;