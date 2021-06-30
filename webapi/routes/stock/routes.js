const express = require('express');
const router = express.Router();
const metier = require('./metier');

//#region Lot
// @route GET api/stock/getInfosLot
// @access Public
router.get('/getInfosLot', (req, primaryRes) => {
    metier.getInfosLot().then(
        res => {
            primaryRes.send(res);
        },
        err => {
            console.log("ERROR", err);
            primaryRes.status(500).json({"error": err.message});
        }
    );
});

// @route GET api/stock/getLot
// @access Public
router.get('/getLot', (req, primaryRes) => {
    metier.getLot(req.body.idLot).then(
        res => {
            primaryRes.send(res);
        },
        err => {
            console.log("ERROR", err);
            primaryRes.status(500).json({"error": err.message});
        }
    );
});

// @route POST api/stock/addLot
// @access Public
router.post('/addLot', (req, primaryRes) => {
    metier.addLot(req.body.numLot, req.body.quantity, req.body.expiration, req.body.idProduit).then(
        res => {
            console.log('RES addLot : ',res);
            primaryRes.send(res);
        },
        err => {
            console.log("ERROR", err);
            primaryRes.status(500).json({"error": err.message});
        }
    );
});

// @route POST api/rayon/deleteLot
// @access Public
router.post('/deleteLot', (req, primaryRes) => {
    metier.deleteLot(req.body.idLot).then(
        res => {
            console.log('RES deleteLot : ',res);
            primaryRes.send(res);
        },
        err => {
            console.log("ERROR deleteLot", err);
            primaryRes.status(500).json({"error": err.message});
        }
    );
});
//#endregion

//#region Produit
// @route GET api/stock/getInfosProduit
// @access Public
router.get('/getInfosProduit', (req, primaryRes) => {
    metier.getInfosProduit().then(
        res => {
            primaryRes.send(res);
        },
        err => {
            console.log("ERROR", err);
            primaryRes.status(500).json({"error": err.message});
        }
    );
});

// @route GET api/stock/getProduit
// @access Public
router.get('/getProduit', (req, primaryRes) => {
    console.log(req.body.idProduit);
    metier.getProduit(req.body.idProduit).then(
        res => {
            primaryRes.send(res);
        },
        err => {
            console.log("ERROR", err);
            primaryRes.status(500).json({"error": err.message});
        }
    );
});

// @route POST api/stock/addProduit
// @access Public
router.post('/addProduit', (req, primaryRes) => {
    metier.addProduit(req.body.name, req.body.categoryId, req.body.producerId).then(
        res => {
            console.log('RES addProduit : ',res);
            primaryRes.send(res);
        },
        err => {
            console.log("ERROR", err);
            primaryRes.status(500).json({"error": err.message});
        }
    );
});

// @route POST api/stock/deleteProduit
// @access Public
router.post('/deleteProduit', (req, primaryRes) => {
    metier.deleteProduit(req.body.idProduit).then(
        res => {
            console.log('RES deleteProduit : ',res);
            primaryRes.send(res);
        },
        err => {
            console.log("ERROR deleteProduit", err);
            primaryRes.status(500).json({"error": err.message});
        }
    );
});
//#endregion


module.exports = router;