const mongoose = require('mongoose');

const connectDb = async () => {
    await mongoose.connect('mongodb://127.0.0.1:27017/myapp');
    console.log("Database connect successfully")
}

module.exports = { connectDb };