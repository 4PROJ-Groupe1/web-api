const express = require('express');
const router = express.Router();
const metier = require('./metier');

// @route POST api/register
// @access Public
router.post('/', (req, primaryRes) => {
    console.log(req.body);
    metier.register(req.body.name, req.body.surname, req.body.email, req.body.password, req.body.producer, req.body.company).then(
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