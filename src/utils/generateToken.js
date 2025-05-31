const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("../config/configEnv.js");

const generateToken = (user) => {
    return jwt.sign(user, JWT_SECRET_KEY, { expiresIn: '1h' })
}

module.exports = generateToken