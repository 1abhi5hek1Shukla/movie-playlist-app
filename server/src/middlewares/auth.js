/**
 *
 * auth.js
 * (middlewares)
 */

const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    console.log("Token undefined");
    return res.status(401).json({
      message: "Auth Failed",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN_KEY);
    req.userData = decoded;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      message: "Auth Failed",
    });
  }
};
