const express = require("express");
const { registerUser, loginUser, refresh } = require("../controller/authController.js");
const { verifyRefreshToken } = require("../middleware/authentication.js");

/* Router middleware */
const router = express.Router();

/* Register route */
router.post('/register', registerUser);

/* Login route */
router.post('/login', loginUser)

/* Refresh token route */
router.post('/refreshToken', verifyRefreshToken, refresh)

module.exports = router;

