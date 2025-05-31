const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    PORT: process.env.PORT || '5500',
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    SALT: process.env.SALT
}