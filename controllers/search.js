const Movie = require("../models/movie");

const searchMoviesOrTheatres = async (req, res) => {
  try {
    const movieKeyword = req.query.movie
      ? { title: { $regex: req.query.movie, $options: "i" } }
      : null;

    const theatreKeyword = req.query.theatre
      ? { name: { $regex: req.query.theatre, $options: "i" } }
      : null;

    if (!movieKeyword && !theatreKeyword) {
      return res.status(400).json({
        msg: "please pass valid query parameters to get search results",
      });
    }

    const movie = await Movie.find(movieKeyword);
    const theatre = await Movie.find(theatreKeyword);
    return res.status(200).json({ movie, theatre });
  } catch (err) {
    res.status(500).json({ msg: "Internal server error" });
  }
};

module.exports = { searchMoviesOrTheatres };
