const mongoose = require("mongoose")
const {Schema} = mongoose

const userSchema = new Schema({
    email: {type: String, required: true},
    name: {type: String, required: true},
    role: {type: String, default: 'user', required:true},
    password: {type: String, required: true}
})

exports.User = mongoose.model("user", userSchema)