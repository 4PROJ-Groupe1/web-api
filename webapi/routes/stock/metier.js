require('../../db');
const utils = require("../../Utils");
const ObjectID = require('mongodb').ObjectID;
const userMetier = require("../user/metier");

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
                return {"lots" : result};
            } else {
                throw new Error("Lot nt present in database");
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
                return {"lot" : result};
            } else {
                throw new Error("Lot unreachable");
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
                    return this.getInfosLot();
                } else {
                    throw new Error("Add problem");
                }
            } catch (e) {
                throw e;
            } finally {
                await client.close();
            }
        } else {
            throw new Error("There is a problem with the parameters");
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
                    throw new Error("Delete problem");
                }
            } catch (e) {
                throw e;
            } finally {
                await client.close();
            }
        } else {
            throw new Error("No id were provided");
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
                return {"products" : result};
            } else {
                throw new Error("Add problem");
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
                return {"produit" : result};
            } else {
                throw new Error("No product found in database");
            }
        } catch (e) {
            throw e;
        } finally {
            await client.close();
        }
    },

    getProduitByIdProducer: async function (idProducer) {
        let client = utils.getNewMongoClient();
        console.log("idProducer : ", idProducer);
        try {
            await client.connect();
            const database = client.db("brilliant_market_test");
            const Produit = database.collection("produit");

            var user = await userMetier.getUser(idProducer)

            var produit = await Produit.find(
                {"producer": user.company}
            ).toArray();
            console.log("user.company : ", user);
            console.log("produit : ", produit);
            
            if (produit) {
                return {"produits" : produit};
            } else {
                throw new Error("No product found in database");
            }
        } catch (e) {
            throw e;
        } finally {
            await client.close();
        }
    },

    addProduit: async function (name, category, producer, prix) {
        if (name && name.trim() != '') {
            let client = utils.getNewMongoClient();
            try {
                await client.connect();
                const database = client.db("brilliant_market_test");
                const Produit = database.collection("produit");
                var result = await Produit.insertOne({name: name, category: category, producer: producer, prix: prix});
                if (result) {
                    return this.getInfosProduit();
                } else {
                    throw new Error("Add problem");
                }
            } catch (e) {
                throw e;
            } finally {
                await client.close();
            }
        } else {
            throw new Error("There is a problem with the parameters");
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
                    throw new Error("Delete problem");
                }
            } catch (e) {
                throw e;
            } finally {
                await client.close();
            }
        } else {
            throw new Error("No id were provided");
        }
    },
    //#endregion
    //#region Categorie
    addCategory: async function (categorie) {
        if (categorie && categorie.trim() != '') {
            let client = utils.getNewMongoClient();
            try {
                await client.connect();
                const database = client.db("brilliant_market_test");
                const shelves = database.collection("productCategory");
                var result = await shelves.insertOne({name: categorie});
                if (result) {
                    return this.getCategories();
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

    getCategories: async function () {
        let client = utils.getNewMongoClient();
        try {
            await client.connect();
            const database = client.db("brilliant_market_test");
            const categories = database.collection("productCategory");
            var result = await categories.find().toArray();
            if (result?.length > 0) {
                return {"categories": result};
            } else {
                throw new Error("There are no categories in database");
            }
        } catch (e) {
            throw e;
        } finally {
            await client.close();
        }
    },
    //#endregion
};