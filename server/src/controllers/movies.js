/**
 *
 * movies.js
 * (controllers)
 */

const axios = require("axios");
const Movie = require("../models/movies");
exports.getMovies = (req, res, next) => {
  var searchText = req.params.searchtext;
  var url =
    "https://www.omdbapi.com/?s=" +
    searchText.toLowerCase() +
    "&apikey=" +
    process.env.OMDP_API_KEY;

  axios
    .get(url)
    .then((response) => {
      res.status(200).json({
        data: response.data.Search,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.getCachedMovies = (req, res, next) => {
  Movie.findOne({ _id: req.params.searchtext })
    .then((movie) => {
      res.status(200).json({
        movie: movie,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};
