const Movie = require("../models/movie");
const ShowTime = require("../models/showTime");

const getShowsByTheatreAndNumberOfDays = async ({
  theatreId,
  startingDate,
  lastDate,
}) => {
  try {
    const scheduledShows = await ShowTime.find({
      theatreId,
    })
      .populate("movieId", "title")
      .populate("theatreId", "name");

    const filteredShows = scheduledShows.filter((show) => {
      const dates = show.dates;
      for (let i = 0; i < dates.length; i++) {
        const date = new Date(dates[i].date);
        if (date >= startingDate && date < lastDate) {
          return true;
        }
      }
      return false;
    });
    console.log(filteredShows);
    return filteredShows;
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getShowsByTheatreAndNumberOfDays };
