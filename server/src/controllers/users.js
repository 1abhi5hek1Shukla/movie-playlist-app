/**
 *
 * users.js
 * (controllers)
 */

const User = require("../models/user");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Movie = require("../models/movies");
const axios = require("axios");
exports.user_signup = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        return res.status(409).json({
          message: "Account with the entered mail already exists",
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err,
            });
          } else {
            const newUser = new User({
              _id: new mongoose.Types.ObjectId(),
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              email: req.body.email,
              password: hash,
              playlist: [],
            });

            newUser
              .save()
              .then((result) => {
                console.log();
                res.status(201).json({
                  message: "User Successfully created",
                });
              })
              .catch((err) => {});
          }
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.user_login = async (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Auth Failed!",
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Auth Failed!",
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              email: user[0].email,
              userId: user[0]._id,
            },
            process.env.JWT_TOKEN_KEY,
            {
              expiresIn: "1h",
            }
          );
          return res.status(200).json({
            token: token,
            userInfo: {
              firstName: user[0].firstName,
              email: user[0].email,
              userId: user[0]._id,
            },
          });
        }

        res.status(401).json({
          message: "Auth Failed!",
        });
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.getPlayListByUser = (req, res, next) => {
  User.findById(req.params.id)
    .select("playlist")
    .populate("playlist")
    .exec()
    .then((results) => {
      if (results.playlist.length === 0) {
        res.status(200).json({
          playlist: [],
        });
      } else {
        res.status(200).json({
          playlist: results.playlist,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.appendToPlayListByUser = (req, res, next) => {
  const userId = req.params.id;
  User.updateOne(
    { _id: userId },
    {
      $push: { playlist: req.body.movieId },
    }
  )
    .exec()
    .then((result) => {
      Movie.findOne({ _id: req.body.movieId })
        .exec()
        .then((movie) => {
          if (!movie) {
            var url =
              "https://www.omdbapi.com/?i=" +
              req.body.movieId +
              "&apikey=" +
              process.env.OMDP_API_KEY;
            axios.get(url).then((response) => {
              const movieToBeCreated = new Movie({
                _id: req.body.movieId,
                Poster: response.data.Poster,
                Title: response.data.Title,
                Rated: response.data.Rated,
                Released: response.data.Released,
                imdbRating: response.data.imdbRating,
                Genre: response.data.Genre,
              });
              movieToBeCreated
                .save()
                .then((result) => {
                  return res.status(200).json({
                    message: "Playlist Updated Successfully",
                  });
                })
                .catch((err) => {
                  console.log(err);
                });
            });
          }
        });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error: error,
      });
    });
};

// var url =
//   "https://www.omdbapi.com/?s=" +
//   searchText.toLowerCase() +
//   "&apikey=" +
//   process.env.OMDP_API_KEY;

// axios
//   .get(url)
//   .then((response) => {
//     res.status(200).json({
//       data: response.data.Search,
//     });
//   })
//   .catch((err) => {
//     res.status(500).json({
//       error: err,
//     });
//   });
