const mongoose = require("mongoose")
const config = require("../config")

const connect = () => {
    mongoose.connect(config.db.host, {
        dbName: config.db.database,
    }).then(() => {
        console.log("Connected MongoDb");
    })
    .catch((err) => {
        console.log("Not Connected MongoDb err ===" + err);
    })
}

module.exports = connect