const express = require('express');
const router = express.Router();
const metier = require('./metier');

// @route POST api/register
// @access Public
router.post('/', (req, primaryRes) => {
    console.log(req.body);
    metier.register(req.body.name, req.body.surname, req.body.email, req.body.password).then(
        res => {
            primaryRes.send("OK")
        },
        err => {
            console.log("ERROR", err);
            primaryRes.status(500).send(err.message);
        }
    );
});

module.exports = router;