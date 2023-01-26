const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
    "mongodb+srv://pedasmanis:p3d45m4n15@clusterbmdb.ii0nwxo.mongodb.net/test";
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
});
let db


async function establishConnection() {
    try {
        await client.connect();
        db = client.db("bmdb");
        console.log("Connected to MongoDB");
    } catch (error) {
        await client.close();
        console.log("Error connecting to MongoDB", error);
        throw error;
    }
}

function getDB() {
    return db;
}

module.exports = { establishConnection, getDB };
