const { MongoClient } = require("mongodb");

//const uri = "mongodb://my-user:Supinf0@10.0.30.20:27017/?replicaSet=example-mongodb";

//const uri = "mongodb://my-user:Supinf0@example-mongodb-svc.mongo.svc.cluster.local:27017/?replicaSet=example-mongodb";

const uri = "mongodb+srv://BackEnd:ezCxkM1gscNRwpuM@cluster0.emrud.mongodb.net/test";


const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});