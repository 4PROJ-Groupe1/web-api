const express = require('express');
const router = express.Router();
const metier = require('./metier');
const auth = require('../../middleware/auth');

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

// @route POST api/user/verifyToken
// @access Public
router.post('/verifyToken', auth.authenticateJWT, (req, primaryRes) => {
    auth.loginWithToken(req.headers.authorization).then(
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