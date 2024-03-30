const mongoose = require("mongoose");
const { Schema } = mongoose;

const roomSchema = new Schema({
 private: {type: Boolean},
 vacant:{type: Boolean},
 player1: {type: Schema.Types.ObjectId, ref:"user", required: true},
 player2: {type: Schema.Types.ObjectId, ref:"user",  default: null},
 lang: {type: String},
 score_p1: {type: Number, default: 0},
 score_p2: {type: Number, default: 0},
 completed: {type: Number, default: 0}
});

exports.Room = mongoose.model("rooms", roomSchema);
