const { MongoClient } = require("mongodb");

module.exports = {
    getNewMongoClient: function () {
    return new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
}
}