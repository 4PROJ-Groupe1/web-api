const express = require('express');
const router = express.Router();
const metier = require('./metier');

// @route POST api/user/login
// @access Public
router.post('/login', (req, primaryRes) => {
    metier.login(req.body.email, req.body.password).then(
        res => {
            primaryRes.send(res);
        },
        err => {
            console.log("ERROR", err);
            primaryRes.status(500).json({"error": err.message});
        }
    );
});

module.exports = router;