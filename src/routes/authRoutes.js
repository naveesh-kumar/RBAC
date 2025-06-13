const express = require("express");
const { registerUser, loginUser, refresh } = require("../controller/authController.js");
const { verifyRefreshToken } = require("../middleware/authentication.js");
const { validateRegisterUser, validateLoginUser } = require("../validators/userValidator.js");

/* Router middleware */
const router = express.Router();

/* Register route */
router.post('/register', validateRegisterUser, registerUser);

/* Login route */
router.post('/login', validateLoginUser, loginUser)

/* Refresh token route */
router.post('/refreshToken', verifyRefreshToken, refresh)

module.exports = router;

