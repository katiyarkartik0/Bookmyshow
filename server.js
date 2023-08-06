const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const Theatre = require("./models/theatre");
const ShowTime = require("./models/showTime");
const routes = express.Router();

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

// API to get dates for a specific theatre in the next 7 days
app.get("/theatres/:theatreId/dates", async (req, res) => {
  try {
    const { theatreId } = req.params;
    // Assuming show_date is stored as ISO date strings in the database
    const next7Days = new Date(
      Date.now() + 7 * 24 * 60 * 60 * 1000
    ).toISOString();
    const dates = await ShowTime.distinct("show_date", {
      theatre_id: theatreId,
      show_date: { $gte: new Date(), $lte: next7Days },
    });
    res.json(dates);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// API to get movies and showtimes for a specific theatre on a given date
app.get("/theatres/:theatreId/dates/:date/movies", async (req, res) => {
  try {
    const { theatreId, date } = req.params;
    const startDate = new Date(date);
    const endDate = new Date(startDate.getTime() + 24 * 60 * 60 * 1000);
    const movies = await ShowTime.find({
      theatre_id: theatreId,
      show_date: { $gte: startDate, $lt: endDate },
    }).populate("movie_id", "movie_name");
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
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
      console.log("listening to post 5000")
    );
  })
  .catch((error) => console.log(error));
