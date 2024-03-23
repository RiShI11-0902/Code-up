const mongoose = require("mongoose");
const { Schema } = mongoose;

const questionsSchema = new Schema({
  question: {
    type: String,
    required: true,
  },
  options: {
    type: [String],
    required: true,
  },
  correctOptionIndex: {
    type: Number,
    required: true,
    min: 0,
    max: 3, // Index of correct option in the options array (0-based)
  },
  topic:{type: String, required: true}
});

exports.Question = mongoose.model("questions", questionsSchema);
