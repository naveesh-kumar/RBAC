const errorHandler = (err, req, res, next) => {
    /* Logging the error stack to console */
    console.log(err.stack);

    /* Returning the response back */
    res.status(500).json({
        status: 500,
        message: "Internal server error"
    })
}

module.exports = errorHandler