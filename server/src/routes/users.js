/**
 *
 * users.js
 * (routes)
 */

const express = require("express");

const UserController = require("../controllers/users");

const authorize = require("../middlewares/auth");
const router = express.Router();

router.post("/signup", UserController.user_signup);

router.post("/login", UserController.user_login);

router.get(
  "/playlist/:id",
  authorize.protect,
  UserController.getPlayListByUser
);

router.patch(
  "/playlist/:id",
  authorize.protect,
  UserController.appendToPlayListByUser
);

router.get("/auth", authorize.protect, (req, res, next) => {
  res.status(200).json({
    message: "valid user",
  });
});

module.exports = router;
