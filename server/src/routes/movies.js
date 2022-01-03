/**
 *
 * movies.js
 * (routes)
 */

const express = require("express");

const MoviesController = require("../controllers/movies");

const router = express.Router();

router.get("/:searchtext", MoviesController.getMovies);

router.get("/cached/:searchtext", MoviesController.getCachedMovies);

module.exports = router;
