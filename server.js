const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const Theatre = require("./models/theatre");
const routes = express.Router();
const bodyParser = require("body-parser");
const { getShowsByTheatreAndNumberOfDays } = require("./helpers/showtime");

dotenv.config();
const app = express();
app.use(cors());
app.use(routes);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.status(200).send("Welcome");
});

app.get("/theatres", async (req, res) => {
  try {
    const theatres = await Theatre.find();
    res.json(theatres);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// API to get dates for a specific theatre in the next variable days
app.get("/theatres/:theatreId/dates/:numberOfDays", async (req, res) => {
  try {
    const { theatreId, numberOfDays } = req.params;
    const lastDate = new Date(
      Date.now() + parseInt(numberOfDays) * 24 * 60 * 60 * 1000
    );

    const shows = await getShowsByTheatreAndNumberOfDays({
      theatreId,
      startingDate: new Date(),
      lastDate,
    });

    const filteredDates = shows.map((show) =>
      show.dates.filter((dateObj) => {
        const date = new Date(dateObj.date);
        return date >= new Date() && date < lastDate;
      })
    );

    res.status(200).json({ filteredDates });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// API to get movies and showtimes for a specific theatre on a given date
app.get("/theatres/:theatreId/dates/:date/movies", async (req, res) => {
  try {
    const { theatreId, date } = req.params;
    const numberOfDays = 1;
    const lastDate = new Date(date)
    lastDate.setDate(lastDate.getDate() + numberOfDays);

    const shows = await getShowsByTheatreAndNumberOfDays({
      theatreId,
      startingDate: new Date(date),
      lastDate,
    });
    res.status(200).json({ shows });
  } catch (err) {
    res.status(500).json({ error:err });
  }
});

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    const server = app.listen(
      process.env.PORT,
      console.log("listening to port " + process.env.PORT)
    );
  })
  .catch((error) => console.log(error));
