const express = require("express");
const movieRoutes = express.Router();
const bodyParser = require("body-parser");
const { getMovies, getComments, getRatings, updateComments, updateRatings } = require("../controllers/movie");

movieRoutes.use(bodyParser.urlencoded({ extended: false }));
movieRoutes.use(bodyParser.json());

movieRoutes.get("/",getMovies)

movieRoutes.get("/comments/:movieId",getComments);

movieRoutes.get("/ratings/:movieId",getRatings);

movieRoutes.put("/comments",updateComments);

movieRoutes.put("/ratings",updateRatings);


module.exports = { movieRoutes };