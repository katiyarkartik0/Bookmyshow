const mongoose = require("mongoose");

const showTimeSchema = mongoose.Schema(
  {
    theatreId: { type: mongoose.Schema.Types.ObjectId, ref: "Theatre" },
    movieId: { type: mongoose.Schema.Types.ObjectId, ref: "Movie" },
    dates: [{ date: { type: Date }, times: [{ hh: Number, mm: Number }] }],
  },
  { timestamps: true }
);

const ShowTime = mongoose.model("ShowTime", showTimeSchema);

module.exports = ShowTime;
