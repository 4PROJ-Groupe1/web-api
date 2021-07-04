const express = require('express');
const router = express.Router();
const metier = require('./metier');


//#region SupermarketOrders
// @route POST api/commandes/addSupermarketOrders
// @access Public
router.post('/addSupermarketOrders', (req, primaryRes) => {
    metier.addSupermarketOrders(req.body.consumerId, req.body.orderDate, req.body.deliveryDate, req.body.lots, req.body.price).then(
        res => {
            console.log('RES addSupermarketOrders : ',res);
            primaryRes.send(res);
        },
        err => {
            console.log("ERROR addSupermarketOrders", err);
            primaryRes.status(500).json({"error": err.message});
        }
    );
});

// @route GET api/commandes/getSupermarketOrders
// @access Public
router.get('/getSupermarketOrders', (req, primaryRes) => {
    metier.getSupermarketOrders().then(
        res => {
            console.log('RES getSupermarketOrders : ',res);
            primaryRes.send(res);
        },
        err => {
            console.log("ERROR getSupermarketOrders", err);
            primaryRes.status(500).json({"error": err.message});
        }
    );
});
//#endregion

module.exports = router;