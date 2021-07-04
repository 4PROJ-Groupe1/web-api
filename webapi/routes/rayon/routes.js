const express = require('express');
const router = express.Router();
const metier = require('./metier');
const auth = require('../../middleware/auth');

// @route GET api/rayon/getInfosRayons
// @access Public
router.get('/getInfosRayons', auth.authenticateJWT, (req, primaryRes) => {
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

// @route POST api/rayon/addProduitRayon
// @access Public
router.post('/addProduitRayon', auth.authenticateJWT, (req, primaryRes) => {
    console.log(req.body.idRayon, req.body.idProduit, req.body.quantiteMax)
    metier.addProduitRayon(req.body.idRayon, req.body.idProduit, req.body.quantiteMax).then(
        res => {
            console.log('RES addProduitRayon : ',res);
            primaryRes.send(res);
        },
        err => {
            console.log("ERROR addProduitRayon", err);
            primaryRes.status(500).json({"error": err.message});
        }
    );
});

// @route POST api/rayon/addRayon
// @access Public
router.post('/addRayon', auth.authenticateJWT, (req, primaryRes) => {
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
router.post('/deleteRayon', auth.authenticateJWT, (req, primaryRes) => {
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

// @route POST api/rayon/fillRayon
// @access Public
router.post('/fillRayon', auth.authenticateJWT, (req, primaryRes) => {
    metier.fillRayon(req.body.idRayon).then(
        res => {
            console.log('RES fillRayon : ',res);
            primaryRes.send(res);
        },
        err => {
            console.log("ERROR fillRayon", err);
            primaryRes.status(500).json({"error": err.message});
        }
    );
});

module.exports = router;