const express = require('express');
const router = express.Router();
const metier = require('./metier');


// @route GET api/rayon/getInfosRayons
// @access Public
router.get('/getInfosRayons', (req, primaryRes) => {
    metier.getInfosRayons().then(
        res => {
            console.log('RES getInfosRayons : ',res);
            primaryRes.send(res);
        },
        err => {
            console.log("ERROR getInfosRayons", err);
            primaryRes.status(500).json({"error": err.message});
        }
    );
});

// @route POST api/rayon/addItemRayon
// @access Public
router.post('/addItemRayon', (req, primaryRes) => {
    metier.addItemRayon(req.body.idRayon, req.body.idProduit, req.body.idLot, req.body.quantite).then(
        res => {
            console.log('RES addItemRayon : ',res);
            primaryRes.send(res);
        },
        err => {
            console.log("ERROR addItemRayon", err);
            primaryRes.status(500).json({"error": err.message});
        }
    );
});

// @route POST api/rayon/addRayon
// @access Public
router.post('/addRayon', (req, primaryRes) => {
    metier.addRayon(req.body.nomRayon).then(
        res => {
            console.log('RES addRayon : ',res);
            primaryRes.send(res);
        },
        err => {
            console.log("ERROR addRayon", err);
            primaryRes.status(500).json({"error": err.message});
        }
    );
});

// @route POST api/rayon/deleteRayon
// @access Public
router.post('/deleteRayon', (req, primaryRes) => {
    metier.deleteRayon(req.body.idRayon).then(
        res => {
            console.log('RES deleteRayon : ',res);
            primaryRes.send(res);
        },
        err => {
            console.log("ERROR deleteRayon", err);
            primaryRes.status(500).json({"error": err.message});
        }
    );
});

module.exports = router;