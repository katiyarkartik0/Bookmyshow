const express = require("express");
const searchRoutes = express.Router();
const bodyParser = require("body-parser");
const { searchMoviesOrTheatres } = require("../controllers/search");

searchRoutes.use(bodyParser.urlencoded({ extended: false }));
searchRoutes.use(bodyParser.json());

searchRoutes.get("/",searchMoviesOrTheatres)

module.exports = { searchRoutes };