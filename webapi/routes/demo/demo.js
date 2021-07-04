const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const metier = require('./metierDemo');

// @route POST api/demo/add-product
// @description demo ajout produit panier user de demo
// @access Public
router.post('/add-product', (req, primaryRes) => {
    metier.addProduct(req.body.idRayon, req.body.idLotProduit, req.body.prix, req.body.nomProduit, req.body.idProduit, req.body.company).then(
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

// @route GET api/demo/cart-validation
// @description demo valider panier user de demo
// @access Public
router.get('/cart-validation', (req, primaryRes) => {
    metier.cartValidation().then(
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

// @route GET api/demo/getPanier
// @description demo afficher panier user de demo
// @access Public
router.get('/getPanier', auth.authenticateJWT, (req, primaryRes) => {
    metier.getPanier().then(
        res => {
            console.log('RES getPanier : ',res);
            primaryRes.send(res);
        },
        err => {
            console.log("ERROR getPanier", err);
            primaryRes.status(500).json({"error": err.message});
        }
    );
});

module.exports = router;
