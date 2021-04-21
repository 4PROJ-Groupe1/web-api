const express = require('express');
const router = express.Router();
const metier = require('./metier');

// @route POST api/user/register
// @access Public
router.post('/register', (req, primaryRes) => {
    console.log(req.body);
    metier.register(req.body.email, req.body.password).then(
        res => {
            primaryRes.send("OK")
        },
        err => {
            console.log("ERROR", err);
            primaryRes.status(500).send({"error": err.message});
        }
    );
});

// @route GET api/user/login
// @access Public
router.get('/login', (req, res) => {
    res.send('test route (GET) working')
});

module.exports = router;