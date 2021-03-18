const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://my-user:Supinf0@example-mongodb-svc.mongo.svc.cluster.local?replicaSet=example-mongodb";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

async function run() {
  try {
    await client.connect();
    const database = client.db("sample_mflix");
    const movies = database.collection("movies");
    // create a document to be inserted
    const doc = { name: "Red", town: "kanto" };
    const result = await movies.insertOne(doc);
    console.log(
      `${result.insertedCount} documents were inserted with the _id: ${result.insertedId}`,
    );
  } finally {
    await client.close();
  }
}
run().catch(console.dir);