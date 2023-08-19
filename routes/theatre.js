const express = require("express");
const theatreRoutes = express.Router();
const bodyParser = require("body-parser");
const { getTheatres, getCalendar, getShows } = require("../controllers/theatre");

theatreRoutes.use(bodyParser.urlencoded({ extended: false }));
theatreRoutes.use(bodyParser.json());

theatreRoutes.get("/",getTheatres)

// API to get dates for a specific theatre in the next variable days
theatreRoutes.get("/:theatreId/dates/:numberOfDays",getCalendar);

// API to get movies and showtimes for a specific theatre on a given date
theatreRoutes.get("/:theatreId/dates/:date/movies",getShows);


module.exports = { theatreRoutes };