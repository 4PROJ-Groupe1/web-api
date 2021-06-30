require('../../db');
const utils = require("../../Utils");
const ObjectID = require('mongodb').ObjectID

module.exports = {
    
    //#region Lot
    getInfosLot: async function () {
        let client = utils.getNewMongoClient();
        try {
            await client.connect();
            const database = client.db("brilliant_market_test");
            const lot = database.collection("lot");
            var result = await lot.find().toArray();
            if (result?.length > 0) {
                return result;
            } else {
                throw new Error("Pas de lot enregistré en base");
            }
        } catch (e) {
            throw e;
        } finally {
            await client.close();
        }
    },
    
    getLot: async function (idLot) {
        let client = utils.getNewMongoClient();
        try {
            await client.connect();
            const database = client.db("brilliant_market_test");
            const lot = database.collection("lot");
            var result = await lot.findOne(
                {"_id": ObjectID(idLot)}
            );
            if (result) {
                return result;
            } else {
                throw new Error("Lot introuvable");
            }
        } catch (e) {
            throw e;
        } finally {
            await client.close();
        }
    },
    
    addLot: async function (numLot, quantity, expiration, idProduit) {
        if (numLot && numLot.trim() != '') {
            let client = utils.getNewMongoClient();
            try {
                await client.connect();
                const database = client.db("brilliant_market_test");
                const lot = database.collection("lot");
                var result = await lot.insertOne({numLot: numLot, quantity: quantity, expiration: expiration, idProduit: idProduit});
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
            throw new Error("Problème dans les paramètres");
        }
    },

    deleteLot: async function (idLot) {
        if (idLot && idLot.trim() != '') {
            let client = utils.getNewMongoClient();
            try {
                await client.connect();
                const database = client.db("brilliant_market_test");
                const Lot = database.collection("lot");
                var result = await Lot.deleteOne({_id: ObjectID(idLot)});
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
    //#endregion
    //#region Produit
    getInfosProduit: async function () {
        let client = utils.getNewMongoClient();
        try {
            await client.connect();
            const database = client.db("brilliant_market_test");
            const Produit = database.collection("produit");
            var result = await Produit.find().toArray();
            if (result?.length > 0) {
                return result;
            } else {
                throw new Error("Pas de produit enregistré en base");
            }
        } catch (e) {
            throw e;
        } finally {
            await client.close();
        }
    },
    
    getProduit: async function (idProduit) {
        let client = utils.getNewMongoClient();
        try {
            await client.connect();
            const database = client.db("brilliant_market_test");
            const Produit = database.collection("produit");

            var result = await Produit.findOne(
                {"_id": ObjectID(idProduit)}
            );
            if (result) {
                return result;
            } else {
                throw new Error("Pas de produit trouvé");
            }
        } catch (e) {
            throw e;
        } finally {
            await client.close();
        }
    },
    
    addProduit: async function (name, categoryId, producerId) {
        if (name && name.trim() != '') {
            let client = utils.getNewMongoClient();
            try {
                await client.connect();
                const database = client.db("brilliant_market_test");
                const Produit = database.collection("produit");
                var result = await Produit.insertOne({name: name, categoryId: categoryId, producerId: producerId});
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
            throw new Error("Problème dans les paramètres");
        }
    },

    deleteProduit: async function (idProduit) {
        console.log(idProduit);
        if (idProduit && idProduit.trim() != '') {
            let client = utils.getNewMongoClient();
            try {
                await client.connect();
                const database = client.db("brilliant_market_test");
                const Produit = database.collection("produit");
                var result = await Produit.deleteOne({_id: ObjectID(idProduit)});
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
    //#endregion
}