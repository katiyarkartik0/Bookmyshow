const mongoose = require("mongoose");

const movieSchema = mongoose.Schema(
  {
    title: { type: String, require: true },
  },
  { timestamps: true }
);

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
