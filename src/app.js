const { MongoClient, ServerApiVersion } = require('mongodb');
const fs = require('node:fs');

// Read in the database password
const uri = fs.readFileSync('DB_Info.txt', 'utf8');

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    await listDatabases(client);

  } finally {

    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
