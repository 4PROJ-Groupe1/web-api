const express = require('express');
const router = express.Router();
const metier = require('./metier');

// @route GET api/commandes/getInfoCommandes
// @access Public
router.get('/getInfoCommandes', (req, res) => {
    res.send('test route (GET) working')
});

// @route GET api/commandes/getCommandesClient
// @access Public
router.get('/getCommandesClient', (req, res) => {
    res.send('test route (GET) working')
});

// @route GET api/commandes/getCommandesPro
// @access Public
router.get('/getCommandesPro', (req, res) => {
    res.send('test route (GET) working')
});

module.exports = router;