const winston = require('winston');

// config
const logger = winston.createLogger({
    level: 'info', // Minimum log level 
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console() // output logs to console
    ]
})

module.exports = logger

