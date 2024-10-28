const mongoose = require('mongoose');
require('dotenv').config();

const mongoURL = 'mongodb://127.0.0.1:27017/hotels';

// const mongoURL = process.env.MONGODB_URL;
mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('connected', () => {
    console.log("Connection to DB is successful");
});
db.on("error", (err) => {
    console.log("Error in DB connection", err);
});
db.on("disconnected", () => {
    console.log('Disconnected from DB');
});


module.exports = db ;