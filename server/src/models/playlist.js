/**
 *
 * playlist.js
 * (models)
 */

const mongoose = require("mongoose");

const playlistSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true,
  },
  movies: [String],
  shared: { type: Boolean, required: true, default: false },
});

module.exports = mongoose.model("Playlist", playlistSchema);
