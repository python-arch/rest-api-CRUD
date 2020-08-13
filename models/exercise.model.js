const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const exerciseSchema = new Schema(
  {
    username: {
      type: String,
    },
    description: String,
    duration: Number,
    date: Date,
  },
  {
    timestamps: true,
  }
);

const Exercise = mongoose.model("exercise", exerciseSchema);

module.exports = Exercise;
