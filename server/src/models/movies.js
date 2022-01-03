/**
 *
 * movies.js
 * Model to cache the data from the api
 */

const mongoose = require("mongoose");

const moviesSchema = mongoose.Schema({
  _id: String,
  Poster: String,
  Title: String,
  Rated: String,
  Released: String,
  imdbRating: String,
  Genre: String,
});

module.exports = mongoose.model("Movie", moviesSchema);
