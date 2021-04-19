const express = require('express');
const router = express.Router();
const metier = require('./metier');

// @route GET api/items/getDifferentsItems
// @access Public
router.get('/getDifferentsItems', (req, res) => {
    res.send('test route (GET) working')
});

// @route GET api/items/getAllItems
// @access Public
router.get('/getAllItems', (req, res) => {
    res.send('test route (GET) working')
});

// @route GET api/items/getItemsPourCategorie
// @access Public
router.get('/getItemsPourCategorie', (req, res) => {
    res.send('test route (GET) working')
});

// @route GET api/items/getItemsCategorie
// @access Public
router.get('/getItemsCategorie', (req, res) => {
    res.send('test route (GET) working')
});

// @route GET api/items/getItemsPerimes
// @access Public
router.get('/getItemsPerimes', (req, res) => {
    res.send('test route (GET) working')
});

// @route GET api/items/getAllSupermarketItems
// @access Public
router.get('/getAllSupermarketItems', (req, res) => {
    res.send('test route (GET) working')
});

module.exports = router;