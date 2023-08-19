const Validator = require("../helpers/validator");
const Theatre = require("../models/theatre");

const { fieldValidation, isValidNumber, isValidDate } = new Validator();

const getTheatres = async (req, res) => {
  try {
    const theatres = await Theatre.find();
    res.json(theatres);
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

const getCalendar = async (req, res) => {
  try {
    const { theatreId, numberOfDays } = req.params;
    const isFieldValid = () => {
      const { isValid, msg, errors } = fieldValidation({
        theatreId,
        numberOfDays,
      });
      if (!isValid) {
        res.status(400).json({ errors, msg });
        return false;
      }
      return true;
    };
    const isNumberValid = () => {
      const { isValid, msg, errors } = isValidNumber({ numberOfDays });
      if (!isValid) {
        res.status(400).json({ errors, msg });
        return false;
      }
      return true;
    };
    if (!isFieldValid() || !isNumberValid()) {
      return;
    }

    const lastDate = new Date(
      Date.now() + parseInt(numberOfDays) * 24 * 60 * 60 * 1000
    );

    const calendar = await getCalendarByTheatreAndPeriod({
      theatreId,
      startingDate: new Date(),
      lastDate,
    });

    res.status(200).json({ calendar });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

const getShows = async (req, res) => {
  try {
    const { theatreId, date } = req.params;

    const { isValid, msg, errors } = fieldValidation({
      theatreId,
      date,
    });
    if (!isValid) {
      return res.status(400).json({ errors, msg });
    }

    if (!isValidDate(date)) {
      return res.status(400).json({ msg: "please provide a valid date" });
    }

    const numberOfDays = 1;
    const lastDate = new Date(date);
    lastDate.setDate(lastDate.getDate() + numberOfDays);

    const shows = await getShowsByTheatreAndPeriod({
      theatreId,
      startingDate: new Date(date),
      lastDate,
    });
    res.status(200).json({ shows });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

module.exports = { getTheatres, getCalendar, getShows };
