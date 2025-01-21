// const { MongoClient } = require('mongodb');
// require('dotenv').config();
// const mongoose = require('mongoose');

// mongoose.connect(process.env.MONGODB_URL, {
// 	dbName: process.env.DB_NAME,
// 	useNewUrlParser: true,
// 	useUnifiedTopology: true,
// });

// const db = mongoose.connection;

// db.on("error", console.error.bind(console, "connection error:"));
// db.once("open", function() {
// 	console.log("Connected");
// });
// module.exports = MongoClient.connect(process.env.MONGODB_URL);

///

const { MongoClient } = require("mongodb");
require('dotenv').config();
const client = new MongoClient(process.env.MONGODB_URL, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
});

client.connect()
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("MongoDB connection error:", err));

module.exports = client;
