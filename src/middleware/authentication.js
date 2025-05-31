const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("../config/configEnv");


const verifyToken = (req, res, next) => {
    const token = req.cookies.app_token;

    /* if token is not available in the request */
    if (!token) {
        return res.status(401).json({
            status: 401,
            message: "Access token missing, unauthorized access"
        })
    }

    try {
        /* If token available */
        const decodedData = jwt.verify(token, JWT_SECRET_KEY);
        req.user = decodedData;
        next();

    } catch (err) {
        return res.status(400).json({
            status: 400,
            message: "Bad Request, Invalid Token"
        })

    }
}

module.exports = verifyToken