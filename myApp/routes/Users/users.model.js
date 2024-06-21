const mongoose = require('mongoose');
//Destructure the schema object
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    contact: {
        type: Number,
        required: true
    },

    address: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    }
})
const UserModel = mongoose.model("userModel", userSchema);

module.exports = { UserModel };