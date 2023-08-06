const mongoose = require("mongoose");

const showTimeSchema = mongoose.Schema(
  {
    theatreId: { type: mongoose.Schema.Types.ObjectId, ref: "Theatre" },
    movieId: { type: mongoose.Schema.Types.ObjectId, ref: "Movie" },
    show_date: {
      type: Date,
      required: true,
    },
    show_time: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const ShowTime = mongoose.model("ShowTime", showTimeSchema);

module.exports = ShowTime;
