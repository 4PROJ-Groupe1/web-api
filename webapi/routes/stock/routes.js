const express = require('express');
const router = express.Router();
const metier = require('./metier');
const auth = require('../../middleware/auth');

//#region Lot
// @route GET api/stock/getInfosLot
// @access Public
router.get('/getInfosLot', auth.authenticateJWT, (req, primaryRes) => {
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

// @route POST api/stock/getLot
// @access Public
router.post('/getLot', auth.authenticateJWT, (req, primaryRes) => {
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
router.post('/addLot', auth.authenticateJWT, (req, primaryRes) => {
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
router.post('/deleteLot', auth.authenticateJWT, (req, primaryRes) => {
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
router.get('/getInfosProduit', auth.authenticateJWT, (req, primaryRes) => {
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

// @route POST api/stock/getProduit
// @access Public
router.post('/getProduit', auth.authenticateJWT, (req, primaryRes) => {
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

// @route POST api/stock/getProduitByIdProducer
// @access Public
router.post('/getProduitByIdProducer', auth.authenticateJWT, (req, primaryRes) => {
    console.log(req.body.idProducer);
    metier.getProduitByIdProducer(req.body.idProducer).then(
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
router.post('/addProduit', auth.authenticateJWT, (req, primaryRes) => {
    metier.addProduit(req.body.name, req.body.category, req.body.producer, req.body.prix).then(
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
router.post('/deleteProduit', auth.authenticateJWT, (req, primaryRes) => {
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

//#region Categorie
// @route POST api/stock/addCategory
// @access Public
router.post('/addCategory', auth.authenticateJWT, (req, primaryRes) => {
    metier.addCategory(req.body.categorie).then(
        res => {
            console.log('RES addCategory : ',res);
            primaryRes.send(res);
        },
        err => {
            console.log("ERROR addCategory", err);
            primaryRes.status(500).json({"error": err.message});
        }
    );
});

// @route GET api/stock/getCategories
// @access Public
router.get('/getCategories', auth.authenticateJWT, (req, primaryRes) => {
    metier.getCategories().then(
        res => {
            console.log('RES getCategories : ',res);
            primaryRes.send(res);
        },
        err => {
            console.log("ERROR getCategories", err);
            primaryRes.status(500).json({"error": err.message});
        }
    );
});
//#endregion

module.exports = router;