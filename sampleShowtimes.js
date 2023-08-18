const mongoose = require("mongoose");
const Theatre = require("./models/theatre");
const Movie = require("./models/movie");
const dotenv = require("dotenv");
const ShowTime = require("./models/showTime");

dotenv.config();
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const theaters = [
  { name: "Broadway Theater", city: "New York City" },
  { name: "West End Playhouse", city: "London" },
  { name: "La Scala Opera House", city: "Milan" },
  { name: "Tokyo Imperial Theater", city: "Tokyo" },
  { name: "Sydney Opera House", city: "Sydney" },
];

const movies = [
  {
    title: "Inception",
    movieFormat: "Digital",
    cast: ["Leonardo DiCaprio", "Ellen Page", "Joseph Gordon-Levitt"],
    crew: ["Christopher Nolan"],
    plot: "A thief who enters the dreams of others to steal their secrets.",
    runtime: 148,
    language: "English",
    genre: "Science Fiction",
    comments: ["Mind-bending movie!", "Great visual effects."],
    ratings: 8.8,
  },
  {
    title: "The Shawshank Redemption",
    movieFormat: "Digital",
    cast: ["Tim Robbins", "Morgan Freeman"],
    crew: ["Frank Darabont"],
    plot: "Two imprisoned men bond over several years, finding solace and eventual redemption through acts of common decency.",
    runtime: 142,
    language: "English",
    genre: "Drama",
    comments: ["Classic movie!", "Emotionally powerful."],
    ratings: 9.3,
  },
  {
    title: "The Dark Knight",
    movieFormat: "Digital",
    cast: ["Christian Bale", "Heath Ledger", "Gary Oldman"],
    crew: ["Christopher Nolan"],
    plot: "Batman sets out to dismantle the remaining criminal organizations that plague Gotham City, but is faced by a new and chaotic criminal, the Joker.",
    runtime: 152,
    language: "English",
    genre: "Action",
    comments: ["Heath Ledger's Joker is iconic!", "Intense action sequences."],
    ratings: 9.0,
  },
  {
    title: "Pulp Fiction",
    movieFormat: "Digital",
    cast: ["John Travolta", "Samuel L. Jackson", "Uma Thurman"],
    crew: ["Quentin Tarantino"],
    plot: "Various interconnected stories involving crime, love, and redemption in Los Angeles.",
    runtime: 154,
    language: "English",
    genre: "Crime",
    comments: ["Quirky and engaging.", "Memorable dialogues."],
    ratings: 8.9,
  },
  {
    title: "Avatar",
    movieFormat: "Digital",
    cast: ["Sam Worthington", "Zoe Saldana", "Sigourney Weaver"],
    crew: ["James Cameron"],
    plot: "A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.",
    runtime: 162,
    language: "English",
    genre: "Adventure",
    comments: ["Visually stunning!", "Immersive world-building."],
    ratings: 7.8,
  },
];

const dates = [
  [
    {
      date: new Date("2023-08-20"),
      times: [
        { hh: 15, mm: 0 },
        { hh: 18, mm: 0 },
        { hh: 21, mm: 0 },
      ],
    },
    {
      date: new Date("2023-08-21"),
      times: [
        { hh: 14, mm: 30 },
        { hh: 17, mm: 30 },
        { hh: 20, mm: 30 },
      ],
    },
    {
      date: new Date("2023-08-22"),
      times: [
        { hh: 16, mm: 0 },
        { hh: 19, mm: 0 },
        { hh: 22, mm: 0 },
      ],
    },
  ],
  [
    {
      date: new Date("2023-08-20"),
      times: [
        { hh: 14, mm: 0 },
        { hh: 17, mm: 0 },
        { hh: 20, mm: 0 },
      ],
    },
    {
      date: new Date("2023-08-21"),
      times: [
        { hh: 15, mm: 0 },
        { hh: 18, mm: 0 },
        { hh: 21, mm: 0 },
      ],
    },
    {
      date: new Date("2023-08-22"),
      times: [
        { hh: 16, mm: 30 },
        { hh: 19, mm: 30 },
        { hh: 22, mm: 30 },
      ],
    },
  ],
  [
    {
      date: new Date("2023-08-20"),
      times: [
        { hh: 14, mm: 30 },
        { hh: 17, mm: 30 },
        { hh: 20, mm: 30 },
      ],
    },
    {
      date: new Date("2023-08-21"),
      times: [
        { hh: 15, mm: 30 },
        { hh: 18, mm: 30 },
        { hh: 21, mm: 30 },
      ],
    },
    {
      date: new Date("2023-08-22"),
      times: [
        { hh: 16, mm: 0 },
        { hh: 19, mm: 0 },
        { hh: 22, mm: 0 },
      ],
    },
  ],
  [
    {
      date: new Date("2023-08-20"),
      times: [
        { hh: 15, mm: 0 },
        { hh: 18, mm: 0 },
        { hh: 21, mm: 0 },
      ],
    },
    {
      date: new Date("2023-08-21"),
      times: [
        { hh: 14, mm: 30 },
        { hh: 17, mm: 30 },
        { hh: 20, mm: 30 },
      ],
    },
    {
      date: new Date("2023-08-22"),
      times: [
        { hh: 16, mm: 0 },
        { hh: 19, mm: 0 },
        { hh: 22, mm: 0 },
      ],
    },
  ],
  [
    {
      date: new Date("2023-08-20"),
      times: [
        { hh: 14, mm: 0 },
        { hh: 17, mm: 0 },
        { hh: 20, mm: 0 },
      ],
    },
    {
      date: new Date("2023-08-21"),
      times: [
        { hh: 15, mm: 0 },
        { hh: 18, mm: 0 },
        { hh: 21, mm: 0 },
      ],
    },
    {
      date: new Date("2023-08-22"),
      times: [
        { hh: 16, mm: 30 },
        { hh: 19, mm: 30 },
        { hh: 22, mm: 30 },
      ],
    },
  ],
];

const seedData = async () => {
  try {
    for (let i = 0; i < theaters.length; i++) {
      await Theatre.create(theaters[i]);
      await Movie.create(movies[i]);

      const {_id:theatreId} = await Theatre.findOne({ name: theaters[i].name });
      const {_id:movieId} = await Movie.findOne({ title: movies[i].title });

      await ShowTime.create({
        theatreId,
        movieId,
        dates: dates[i],
      });
    }

    console.log("Sample data inserted successfully.");
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    mongoose.disconnect();
  }
};

seedData();
