# Express Movie Theatre App(Bookmyshow)

This is a simple Express.js application for managing movie theatres, movies, and movie-related data. The app provides APIs for retrieving information about theatres, movies, searching for movies or theatres, and managing comments and ratings for movies.

## Getting Started

To run this application locally, follow the steps below:

### Prerequisites

- Node.js installed on your machine
- MongoDB installed and running locally (or provide a remote MongoDB URL)

### Installation

1. Clone the repository:

   ```bash
   https://github.com/<your-username>/Bookmyshow.git
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the project root directory and set the following environment variables:

   ```env
   PORT=3000 # Port for the Express.js server
   MONGO_URL=your-mongodb-connection-url # MongoDB connection URL
   ```

### Running the Application

1. Start the Express.js server:

   ```bash
   npm start
   ```

   The server will start and listen on the port specified in your `.env` file (default is 3000).

2. You can now access the application by navigating to `http://localhost:3000` in your web browser.

## API Endpoints

### Theatres

- **GET /theatres**: Get a list of all theatres.
- **GET /theatres/:theatreId/dates/:numberOfDays**: Get dates for a specific theatre in the next `numberOfDays` days.
- **GET /theatres/:theatreId/dates/:date/movies**: Get movies and showtimes for a specific theatre on a given date.

### Movies

- **GET /movies**: Get a list of all movies.
- **GET /movies/comments/:movieId**: Get comments for a specific movie.
- **GET /movies/ratings/:movieId**: Get ratings for a specific movie.
- **PUT /movies/comments**: Update comments for a movie.
- **PUT /movies/ratings**: Update ratings for a movie.

### Search

- **GET /search**: Search for movies or theatres based on a query.

## Project Structure

The project is organized into multiple modules to keep the codebase clean and maintainable:

- **Server (app.js)**: Entry point of the application, where the Express.js server is configured.

- **Routes (theatre.js, movie.js, search.js)**: Define the route handlers for different parts of the application.

- **Controllers (controllers)**: Contain the logic for handling HTTP requests and responses. Each controller corresponds to a specific feature (theatre, movie, search).

- **Models (models)**: Define data models used by Mongoose to interact with the MongoDB database.

- **Middleware (middleware)**: Custom middleware functions for request processing.

## Acknowledgments

- This project was created as a learning exercise for building RESTful APIs with Express.js and MongoDB.
- Inspiration and guidance were drawn from various online tutorials and documentation and Airtribe.
