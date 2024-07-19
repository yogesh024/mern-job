const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

class Database {
    constructor() {
        this.connect();
    }

    connect() {
        mongoose.connect("mongodb+srv://ykajay55:ykajay55@cluster0.nkyv8er.mongodb.net/", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
            .then(() => {
                console.log("Database connected successfully");
            })
            .catch((err) => {
                console.log("Error in connection:", err);
            });
    }
}

module.exports = new Database();
