const Validator = require("../helpers/validator");
const Movie = require("../models/movie");

const { fieldValidation, isValidNumber } = new Validator();

const getMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    return res.status(200).json({ movies });
  } catch (err) {
    return res.status(500).json({ msg: err });
  }
};

const getComments = async (req, res) => {
  try {
    const { movieId } = req.params;
    const { isValid, msg, errors } = fieldValidation({ movieId });
    if (!isValid) {
      return res.status(400).json({ msg, errors });
    }
    const { comments } = await Movie.findOne({ _id: movieId });
    return res.status(200).json({ comments });
  } catch (err) {
    return res.status(500).json({ msg: err });
  }
};

const getRatings = async (req, res) => {
  try {
    const { movieId } = req.params;
    const { isValid, msg, errors } = fieldValidation({ movieId });
    if (!isValid) {
      return res.status(400).json({ errors, msg });
    }
    const { ratings } = await Movie.findOne({ _id: movieId });
    return res.status(200).json({ ratings });
  } catch (err) {
    return res.status(500).json({ msg: err });
  }
};

const updateComments = async (req, res) => {
  try {
    const { movieId, comment } = req.body;
    const { isValid, msg, errors } = fieldValidation({ movieId, comment });
    if (!isValid) {
      return res.status(400).json({ errors, msg });
    }
    await Movie.findOneAndUpdate(
      { _id: movieId },
      { $push: { comments: comment } }
    );
    return res.status(200).json({ msg: "comment has been added" });
  } catch (err) {
    return res.status(500).json({ msg: err });
  }
};

const updateRatings = async (req, res) => {
  try {
    const { movieId, rating } = req.body;
    const isFieldValid = () => {
      const { isValid, msg, errors } = fieldValidation({ movieId, rating });
      if (!isValid) {
        res.status(400).json({ errors, msg });
        return false;
      }
      return true;
    };
    const isNumberValid = () => {
      const { isValid, msg, errors } = isValidNumber({ rating });
      if (!isValid) {
        res.status(400).json({ errors, msg });
        return false;
      }
      return true;
    };
    if (!isFieldValid() || !isNumberValid()) {
      return;
    }
    await Movie.findOneAndUpdate(
      { _id: movieId },
      { $push: { ratings: rating } }
    );
    res.status(200).json({ msg: "ratings has been added" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Internal server error" });
  }
};

module.exports = {
  getMovies,
  getComments,
  getRatings,
  updateComments,
  updateRatings,
};
