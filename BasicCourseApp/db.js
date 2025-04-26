const mongoose = require("mongoose")

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    password: String
})

const adminSchema = new Schema({
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    password: String
})

const courseSchema = new Schema({
    title: String,
    description: String,
    price: Number,
    imageUrl: String,
    creatorId:ObjectId
})

const purchaseSchema = new Schema({
    courseId: ObjectId,
    userId: ObjectId
})

const userModel = mongoose.model("user", userSchema)
const adminModel = mongoose.model("admin", adminSchema)
const courseModel = mongoose.model("course", courseSchema)
const purchaseModel = mongoose.model("purchase", purchaseSchema)

module.exports = {
    userModel: userModel,
    adminModel: adminModel,
    courseModel: courseModel,
    purchaseModel: purchaseModel
}