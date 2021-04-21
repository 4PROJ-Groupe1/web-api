const utils = require("../../Utils");
const crypto = require('crypto');
require('../../db');
require('../../Utils');

module.exports = {

    register: async function (email, password) {
        var salt = crypto.randomBytes(16).toString('hex');
        var hash = crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`);

        let client = utils.getNewMongoClient();
        try {
            await client.connect();
            const database = client.db("TEST_db_user");
            const users = database.collection("user");
            // create a document to be inserted
            const result = await users.updateOne(
                {"email": email},
                {
                    $setOnInsert: {
                        "email": email,
                        salt: salt,
                        hash: hash
                    }
                },
                {upsert: true}
            );
            if (result.upsertedCount !== 1) {
                throw new Error('mail existant en base');
            } else {
                console.log('user inserted');
            }
        } catch (e) {
            throw e;
        } finally {
            await client.close();
        }
    }
};