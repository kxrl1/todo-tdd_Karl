const mongoose = require("mongoose");

async function connect() {
    try{
        await mongoose.connect(
            "mongodb://localhost:27017/tests",
        )
        console.log("Connected to database");
    } catch (err) {
        console.error("Could not connect to database");
        console.error(err);
    }
}

module.exports = {
    connect
}