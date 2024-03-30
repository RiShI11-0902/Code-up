const mongoose = require("mongoose")
const {Schema} = mongoose

const userSchema = new Schema({
    username: {type: String, required: true},
    name: {type: String, required: true},
    role: {type: String, default: 'user', required:true},
    password: {type: String, required: true},
    current_score:{type: Number, default: 0},
    score_history: [{
        topic: {
          type: String,
          required: true
        },
        score: {
          type: String,
        }
      }]
})

exports.User = mongoose.model("user", userSchema)