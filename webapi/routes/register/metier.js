const utils = require("../../Utils");
const crypto = require('crypto');
require('../../db');
require('../../Utils');

module.exports = {

    register: async function (name, surname, email, password, producer, company) {
        var salt = crypto.randomBytes(16).toString('hex');
        var hash = crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`);

        let client = utils.getNewMongoClient();
        try {
            await client.connect();
            const database = client.db("TEST_db_user");
            const users = database.collection("user");
            // create a document to be inserted
            let docInsert;
            if (producer) {
                docInsert = {
                    "name": name,
                    "surname": surname,
                    "company": company,
                    "email": email,
                    "role": "producer",
                    salt: salt,
                    hash: hash
                }
            } else {
                docInsert = {
                    "name": name,
                    "surname": surname,
                    "email": email,
                    "role": "consumer",
                    salt: salt,
                    hash: hash
                }
            }
            const result = await users.updateOne(
                {"email": email},
                {
                    $setOnInsert: docInsert
                },
                {upsert: true}
            );
            if (result.upsertedCount !== 1) {
                throw new Error('Mail address already taken');
            } else {
                console.log('user inserted');
                return {"result": "OK"};
            }
        } catch (e) {
            throw e;
        } finally {
            await client.close();
        }
    }
};