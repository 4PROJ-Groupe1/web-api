require('../../db');
const utils = require("../../Utils");
const ObjectID = require('mongodb').ObjectID


module.exports = {
    getInfosRayons: async function () {
        let client = utils.getNewMongoClient();
        try {
            await client.connect();
            const database = client.db("brilliant_market_test");
            const shelves = database.collection("shelf");
            var result = await shelves.find().toArray();
            if (result?.length > 0) {
                return result;
            } else {
                throw new Error("Pas de rayon enregistré en base");
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
                const database = client.db("brilliant_market_test");
                const shelves = database.collection("shelf");
                var result = await shelves.insertOne({name: nomRayon, items: []});
                if (result) {
                    return {"result": "OK"};
                } else {
                    throw new Error("Problème ajout");
                }
            } catch (e) {
                throw e;
            } finally {
                await client.close();
            }
        } else {
            throw new Error("Pas de nom");
        }
    },

    deleteRayon: async function (idRayon) {
        if (idRayon && idRayon.trim() != '') {
            let client = utils.getNewMongoClient();
            try {
                await client.connect();
                const database = client.db("brilliant_market_test");
                const shelves = database.collection("shelf");
                var result = await shelves.deleteOne({_id: ObjectID(idRayon)});
                if (result) {
                    return {"result": "OK"};
                } else {
                    throw new Error("Problème suppression");
                }
            } catch (e) {
                throw e;
            } finally {
                await client.close();
            }
        } else {
            throw new Error("Pas d'id");
        }
    },

    addItemRayon: async function (idRayon, idProduit, idLot, quantite) {
        let client = utils.getNewMongoClient();
        try {
            await client.connect();
            const database = client.db("brilliant_market_test");
            const shelves = database.collection("shelf");
            // On cherche le rayon concerné
            var result = await shelves.findOne(
                {"_id": ObjectID(idRayon)}
            );
            if (result) {
                let productPresent = false;
                let productIndice = 0;
                for (const item of result?.items) {
                    if (item?.productId === idProduit) {
                        productPresent = true;
                        break;
                    }
                    productIndice++
                }
                if (!productPresent) {
                    result?.items?.push({'productId': idProduit, items: [{idLot: idLot, quantity: quantite}]})
                } else {
                    // check si produits de ce lot déjà en rayon
                    let lotPresent = false;
                    let indiceLot = 0;
                    for (const item of result?.items[productIndice]) {
                        if (item?.idLot === idLot) {
                            lotPresent = true;
                            break;
                        }
                    }
                    // Produits de ce lot déjà en rayon
                    if (lotPresent) {
                        result.items[productIndice].items[indiceLot].quantity = Number(result?.items[productIndice].items[indiceLot].quantity) + quantite;
                    } else {
                        result?.items[productIndice]?.items.push({idLot: idLot, quantity: quantite});
                    }
                }
                var resultInsert = await shelves.updateOne({_id: idRayon}, result?.items);

                if (resultInsert) {
                    return {"result": "OK"};
                } else {
                    throw new Error("Problème enregistrement");
                }
            } else {
                throw new Error("id rayon non présent en base");
            }
        } catch (e) {
            throw e;
        } finally {
            await client.close();
        }
    }
};