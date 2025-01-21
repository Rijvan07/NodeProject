const { MongoClient } = require("mongodb");
require('dotenv').config();
const client = new MongoClient("mongodb+srv://arshshaikh6075:hYbxMnFWBsOZkf3v@cluster0.rem50.mongodb.net/CodeBase?retryWrites=true&w=majority&appName=Cluster0", {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
});

client.connect()
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("MongoDB connection error:", err));

module.exports = client;
