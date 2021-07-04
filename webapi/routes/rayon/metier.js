require('../../db');
const utils = require("../../Utils");
const ObjectID = require('mongodb').ObjectID


module.exports = {
    getInfosRayons: async function () {
        let client = utils.getNewMongoClient();
        try {
            await client.connect();
            const database = client.db("brilliant_market");
            const shelves = database.collection("shelf");
            var result = await shelves.find().toArray();
            if (result?.length > 0) {
                return {'rayons': result};
            } else {
                throw new Error("There are no shelf in the database");
            }
        } catch (e) {
            throw e;
        } finally {
            await client.close();
        }
    },

    addRayon: async function (nomRayon) {
        if (nomRayon && nomRayon.trim() != '') {
            let client = utils.getNewMongoClient();
            try {
                await client.connect();
                const database = client.db("brilliant_market");
                const shelves = database.collection("shelf");
                var result = await shelves.insertOne({name: nomRayon, items: []});
                if (result) {
                    return this.getInfosRayons();
                } else {
                    throw new Error("Add problem");
                }
            } catch (e) {
                throw e;
            } finally {
                await client.close();
            }
        } else {
            throw new Error("No name were provided");
        }
    },

    deleteRayon: async function (idRayon) {
        if (idRayon && idRayon.trim() != '') {
            let client = utils.getNewMongoClient();
            try {
                await client.connect();
                const database = client.db("brilliant_market");
                const shelves = database.collection("shelf");
                var result = await shelves.deleteOne({_id: ObjectID(idRayon)});
                if (result) {
                    return {"result": "OK"};
                } else {
                    throw new Error("Delete problem");
                }
            } catch (e) {
                throw e;
            } finally {
                await client.close();
            }
        } else {
            throw new Error("No id provided");
        }
    },

    addProduitRayon: async function (idRayon, idProduit, quantiteMax) {
        let client = utils.getNewMongoClient();
        try {
            await client.connect();
            const database = client.db("brilliant_market");
            const shelves = database.collection("shelf");
            // On cherche le rayon concerné
            /*var result = await shelves.findOne(
                {"_id": ObjectID(idRayon)}
            );
            if (result) {

                result?.items?.push({'productId': idProduit, items: [], maxQuantity: quantiteMax});

                var resultInsert = await shelves.updateOne({$set:{items: result?.items}});

                if (resultInsert) {
                    return {"result": "OK"};
                } else {
                    throw new Error("Problème enregistrement");
                }
            } else {
                throw new Error("id rayon non présent en base");
            }*/
            var result = await shelves.findOneAndUpdate(
                {"_id": ObjectID(idRayon)},
                {$push:{items: {'productId': idProduit, items: [], maxQuantity: quantiteMax}}}
            )
            if (result) {
                return this.getInfosRayons();
            } else {
                throw new Error("Add problem");
            }
        } catch (e) {
            throw e;
        } finally {
            await client.close();
        }
    },

    fillRayon: async function (idRayon) {
        let client = utils.getNewMongoClient();
        try {
            await client.connect();
            const database = client.db("brilliant_market");
            const shelves = database.collection("shelf");
            const lots = database.collection("lot");
            let products = [];

            // recherche rayon
            var shelf = await shelves.findOne(
                {"_id": ObjectID(idRayon)}
            );
            if (shelf) {
                // boucle rayon.items
                // pour chaque item regarder quantite max et quantite rayon (boucle sur rayon.items[x].items)
                for (const product of shelf?.items) {
                    let quantity = 0;
                    for (const lot of product?.items) {
                        quantity += lot.quantity;
                    }
                    console.log(product)
                    if (product.maxQuantity > quantity) {
                        var lotsProduit = await lots.find({"idProduit": product.productId}, {sort: {expiration: -1}}).toArray();
                        console.log("LOTS TROUVES", lotsProduit);
                        for (const lot of lotsProduit) {
                            if (lot?.quantity >= (product.maxQuantity - quantity)) {
                                products.push({lot: lot, quantite: (product.maxQuantity - quantity)});
                                console.log("1 ",products)
                                product.items.push({idLot: lot._id, quantity: (product.maxQuantity - quantity)});
                                break;
                            } else {
                                products.push({lot: lot, quantite: lot.quantity});
                                console.log("2 ",products)
                                product.items.push({idLot: lot._id, quantity: lot.quantity});
                                quantity += lot.quantity;
                            }
                        }
                    }
                }

                // update rayon avec lots
                var result = await shelves.findOneAndUpdate(
                    {"_id": ObjectID(idRayon)},
                    {$set:{items: shelf?.items}}
                );

                if (result) {
                    if (products.length > 0) {
                        return {products: products, rayons: await this.getInfosRayons()};
                    } else {
                        throw new Error("Shelf is already filled or there isn't products anymore in supply");
                    }
                } else {
                    throw new Error("Add problem");
                }
            } else {
                throw new Error("Shel not present in database");
            }
        } catch (e) {
            throw e;
        } finally {
            await client.close();
        }
    }
};