require('../../db');
require('../../Utils');
const utils = require("../../Utils");
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const ObjectID = require('mongodb').ObjectID


module.exports = {

    login: async function (email, password) {
        let client = utils.getNewMongoClient();
        try {
            await client.connect();
            const database = client.db("TEST_db_user");
            const users = database.collection("user");
            var result = await users.findOne(
                {"email": email}
            );
            if (result) {
                console.log(result);
                var hashToVerify = crypto.pbkdf2Sync(password, result?.salt, 1000, 64, `sha512`).toString(`hex`);
                if (result?.hash === hashToVerify) {
                    const accessToken = jwt.sign({ name: result?.name, surname: result?.surname, email: result?.email, role: result?.role, id: result?._id }, result?.salt);
                    return {"token": accessToken};
                } else {
                    throw new Error("adresse mail ou mot de passe non valide");
                }
            } else {
                throw new Error("adresse mail ou mot de passe non valide");
            }
        } catch (e) {
            throw e;
        } finally {
            await client.close();
        }
    },

    getUser: async function (userId) {
        let client = utils.getNewMongoClient();
        try {
            await client.connect();
            const database = client.db("TEST_db_user");
            const users = database.collection("user");
            var result = await users.findOne(
                {"_id": ObjectID(userId)}
            );
            if (result) {
                return result;
            } else {
                throw new Error("id utilisateur non présent en base");
            }
        } catch (e) {
            throw e;
        } finally {
            await client.close();
        }
    }

};