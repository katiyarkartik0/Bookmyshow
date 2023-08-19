const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = express.Router();
const bodyParser = require("body-parser");

const { theatreRoutes } = require("./routes/theatre");
const { movieRoutes } = require("./routes/movie");
const { searchRoutes } = require("./routes/search");

dotenv.config();
const app = express();
app.use(cors());
app.use(routes);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.status(200).send("Welcome");
});

app.use("/theatres",theatreRoutes );
app.use("/movies",movieRoutes );
app.use("/search",searchRoutes );

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
