const Movie = require("../models/movie");
const ShowTime = require("../models/showTime");

const getShowsByTheatreAndPeriod = async ({
  theatreId,
  startingDate,
  lastDate,
}) => {
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
};

const getCalendarByTheatreAndPeriod = async ({
  theatreId,
  startingDate,
  lastDate,
}) => {
    const scheduledShows = await ShowTime.find({
      theatreId,
    });

    const filteredDates = [];

    for (let i = 0; i < scheduledShows.length; i++) {
      const dates = scheduledShows[i].dates;
      for (let j = 0; j < dates.length; j++) {
        const date = new Date(dates[j].date);
        if (date >= startingDate && date < lastDate) {
          filteredDates.push(dates[j]);
        }
      }
    }

    return filteredDates;
};

module.exports = { getShowsByTheatreAndPeriod,getCalendarByTheatreAndPeriod };
