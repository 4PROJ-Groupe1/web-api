require('../../db');
const utils = require("../../Utils");
const ObjectID = require('mongodb').ObjectID

module.exports = {
    addProduct: async function (idRayon, idLotProduit, nomProduit, idProduit, prix, company) {
        let client = utils.getNewMongoClient();
        try {
            await client.connect();
            const database = client.db("brilliant_market_test");
            const produitsPanier = database.collection("articlePanierDemo");
            var result = await produitsPanier.insertOne(
                {
                    idRayon: idRayon,
                    idLot: idLotProduit,
                    nomProduit: nomProduit,
                    idProduit: idProduit,
                    prix: prix,
                    company: company,
                    quantite: 1
                });
            if (result) {
                return {"result": "OK"};
            } else {
                throw new Error("Add problem");
            }
        } catch (e) {
            throw e;
        } finally {
            await client.close();
        }
    },

    cartValidation: async function () {
        let panier = await this.getPanier();
        let order = {
            "consumerId": "60dbad4d6fa4a1d9a9212694", // TODO: mettre id utilisateur demo
            "orderDate": new Date(),
            "lots": [],
            "price": 12
        }

        let client = utils.getNewMongoClient();
        try {
            await client.connect();
            const database = client.db("brilliant_market_test");
            const shelves = database.collection("shelf");
            for (const produit of panier) {
                let tempShelf = database.collection("shelf").findOne({"_id": ObjectID(produit.idRayon)});
                for (const shelfProduit of tempShelf.items) {
                    if (shelfProduit.productId === produit.idProduit) {
                        for (const lot of shelfProduit.items) {
                            if (lot.idLot === produit.idLot) {
                                lot.quantity += 1;
                                await shelves.findOneAndUpdate(
                                    {"_id": ObjectID(produit.idRayon)},
                                    {$set:{items: tempShelf.items}}
                                );
                                order.lots.push({idLot: produit.idLot, quantity: 1});
                                order.price += produit.prix;
                                break;
                            }
                        }
                        break;
                    }
                }
            }

            database.collection("articlePanierDemo").drop();

            database.collection("supermarketOrders").insertOne(order);
        } catch (e) {
            throw e;
        } finally {
            await client.close();
        }
    },

    getPanier: async function () {
        let client = utils.getNewMongoClient();
        try {
            await client.connect();
            const database = client.db("brilliant_market_test");
            const produitsPanier = database.collection("articlePanierDemo");
            var result = await produitsPanier.find().toArray();
            if (result?.length > 0) {
                return {'produits': result};
            } else {
                throw new Error("The cart is Empty");
            }
        } catch (e) {
            throw e;
        } finally {
            await client.close();
        }
    }
};