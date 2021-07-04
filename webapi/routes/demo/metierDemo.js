require('../../db');
const utils = require("../../Utils");
const ObjectID = require('mongodb').ObjectID

module.exports = {
    addProduct: async function (idRayon, idLotProduit, nomProduit, idProduit, prix, company) {
        let client = utils.getNewMongoClient();
        try {
            await client.connect();
            const database = client.db("brilliant_market");
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
        // let panier = await this.getPanier().produits;
        let client = utils.getNewMongoClient();
        await client.connect();
        const database = client.db("brilliant_market");
        let panierCollection = database.collection("articlePanierDemo");
        var panier = await panierCollection.find().toArray();
        console.log(panier);
        // let order = {
        //     "consumerId": "60e1e7686fa4a1d9a9716a4c", // TODO: mettre id utilisateur demo
        //     "orderDate": new Date(),
        //     "lots": [],
        //     "price": 12
        // }

        try {
            // const shelves = database.collection("shelf");
            // for (const produit of panier) {
            //     let tempShelf = await database.collection("shelf").findOne({"_id": ObjectID(produit.idRayon)});
            //     for (const shelfProduit of tempShelf.items) {
            //         if (shelfProduit.productId === produit.idProduit) {
            //             for (const lot of shelfProduit.items) {
            //                 if (lot.idLot === produit.idLot) {
            //                     lot.quantity += 1;
            //                     await shelves.findOneAndUpdate(
            //                         {"_id": ObjectID(produit.idRayon)},
            //                         {$set:{items: tempShelf.items}}
            //                     );
            //                     order.lots.push({idLot: produit.idLot, quantity: 1});
            //                     order.price += produit.prix;
            //                     break;
            //                 }
            //             }
            //             break;
            //         }
            //     }
            // }

            await database.collection("articlePanierDemo").drop();

            // await database.collection("supermarketOrders").insertOne(order);
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
            const database = client.db("brilliant_market");
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