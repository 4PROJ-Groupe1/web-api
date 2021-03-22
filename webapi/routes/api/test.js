const express = require('express');
const router = express.Router();

// @route GET api/test
// @description test
// @access Public
router.get('/', (req, res) => {
    res.send('test route (GET) working')
});

module.exports = router;