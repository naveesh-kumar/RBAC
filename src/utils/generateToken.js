const jwt = require("jsonwebtoken");
const {
  JWT_SECRET_KEY,
  JWT_REFRESH_SECRET_KEY
} = require("../config/configEnv.js");

const generateAccessToken = (user) => {
  return jwt.sign(user, JWT_SECRET_KEY, { expiresIn: "15m" });
};

const generateRefreshToken = (user) => {
  return jwt.sign(user, JWT_REFRESH_SECRET_KEY, { expiresIn: "7d" });
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
};
