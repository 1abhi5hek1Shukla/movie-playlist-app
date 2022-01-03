/**
 *
 * app.js
 * (server)
 */
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();
const cors = require("cors");
app.use(cors());

const userRoutes = require("./src/routes/users");
// const playlistRoutes = require("./src/routes/playlists");
const moviesRoutes = require("./src/routes/movies");
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const DATABASE_URI =
  "mongodb+srv://abhishek:" +
  process.env.password +
  "@cluster0.vuuu6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(DATABASE_URI);

mongoose.Promise = global.Promise;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

//Routes config
app.get("/", (req, res, next) => {
  res.send("Movie App");
});
app.use("/users", userRoutes);
app.use("/movies", moviesRoutes);

//
app.use((req, res, next) => {
  const error = new Error("Route not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
