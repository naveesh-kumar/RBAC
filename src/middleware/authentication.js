const jwt = require("jsonwebtoken");
const {
  JWT_SECRET_KEY,
  JWT_REFRESH_SECRET_KEY,
} = require("../config/configEnv");

const verifyToken = (req, res, next) => {
  const token = req.cookies.app_token;

  /* if token is not available in the request */
  if (!token) {
    return res.status(401).json({
      status: 401,
      message: "Access token missing, unauthorized access",
    });
  }

  try {
    /* If token available */
    const decodedData = jwt.verify(token, JWT_SECRET_KEY);
    req.user = decodedData;
    next();
  } catch (err) {
    return res.status(400).json({
      status: 400,
      message: "Bad Request, Invalid Token",
    });
  }
};

const verifyRefreshToken = (req, res, next) => {
  // Assuming FE sends the refresh token in Authorization Header
  const authHeaders =
    req.headers["Authorization"] || req.headers["authorization"];

  if (authHeaders && authHeaders.startsWith("Bearer")) {
    const refreshToken = authHeaders.split(" ")[1];

    /* If no refresh token available */
    if (!refreshToken) {
      return res.status(401).json({
        status: 401,
        message: "Refresh Token Required",
      });
    }

    try {
      /* If token available */
      const decodedData = jwt.verify(refreshToken, JWT_REFRESH_SECRET_KEY);
      req.user = decodedData;
      req.refreshToken = refreshToken;
      next();
    } catch (err) {
      return res.status(400).json({
        status: 400,
        message: "Bad Request, Invalid Token",
      });
    }
  } else {
    return res.status(401).json({
      status: 401,
      message: "Unauthorized access",
    });
  }
};

module.exports = { verifyToken, verifyRefreshToken };
