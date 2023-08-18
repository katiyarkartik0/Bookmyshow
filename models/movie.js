const mongoose = require("mongoose");

const movieSchema = mongoose.Schema(
  {
    title: { type: String, require: true },
    movieFormat: { type: String },
    cast: [{ type: String }],
    crew: [{ type: String }],
    plot: { type: String },
    runtime: { type: Number },
    language: { type: String },
    genre: { type: String },
    comments: [{ type: String }],
    ratings: { type: Number },
  },
  { timestamps: true }
);

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
