const mongoose = require("mongoose")

const Schema = mongoose.Schema

let user = new Schema({
    username: { type: String, unique: true },
    password: String,
    name : String
})

const UserModel = mongoose.model("users", user);

module.exports = {
    UserModel
}