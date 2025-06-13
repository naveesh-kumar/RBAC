const express = require("express");
const {verifyToken} = require("../middleware/authentication.js");
const protectRoute = require("../middleware/authorization.js");

const router = express.Router();

router.get('/dashboard', verifyToken, protectRoute('ADMIN'), (req, res) => {
    res.status(200).json({
        status: "200",
        message: "User Allowed to access dashboard"
    })
});

module.exports = router;