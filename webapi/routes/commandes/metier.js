require('../../db');
const utils = require("../../Utils");
const ObjectID = require('mongodb').ObjectID;
const userMetier = require("../user/metier");


module.exports = {
    //#region Orders
    //#region SupermarketOrders
    addSupermarketOrders: async function (consumerId, orderDate, deliveryDate, lots, price) {
        if (consumerId && consumerId.trim() != '') {
            let client = utils.getNewMongoClient();
            try {
                await client.connect();
                const database = client.db("brilliant_market");
                const supermarketOrders = database.collection("supermarketOrders");
                var result = await supermarketOrders.insertOne(
                    {
                        consumerId: consumerId,
                        orderDate: orderDate,
                        deliveryDate: deliveryDate,
                        lots: lots,
                        price: price,
                        
                    });
                if (result) {
                    return this.getSupermarketOrders();
                } else {
                    throw new Error("add problem");
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

    getSupermarketOrders: async function () {
        let client = utils.getNewMongoClient();
        try {
            await client.connect();
            const database = client.db("brilliant_market");
            const supermarketOrders = database.collection("supermarketOrders");
            var result = await supermarketOrders.find().toArray();
            if (result?.length > 0) {
                return {"supermarketOrders": result};
            } else {
                throw new Error("no supermarketOrders in database");
            }
        } catch (e) {
            throw e;
        } finally {
            await client.close();
        }
    },
    //#endregion
    //#endregion
};