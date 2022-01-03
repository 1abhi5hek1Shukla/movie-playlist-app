/**
 *
 * playlists.js
 * (routes)
 */

const express = require("express");

const PlaylistController = require("../controllers/playlists");
const authorize = require("../middlewares/auth");
const router = express.Router();

router.get("/:id", PlaylistController.getPlayList);

router.get(
  "/user/:id",
  authorize.protect,
  PlaylistController.getPlayListByUser
);

router.patch(
  "/user/:id",
  authorize.protect,
  PlaylistController.appendToPlayListByUser
);
module.exports = router;
