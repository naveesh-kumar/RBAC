
const parseExpiresIn = (expiresIn) => {
    if (!expiresIn) return 0;

    const unit = expiresIn.slice(-1); // '7d' => d
    const value = parseInt(expiresIn.slice(0, 1), 10);

    if (isNaN(value)) return 0;

    switch (unit.toLowerCase()) {
        case 'd': //days
            return value * 24 * 60 * 60 * 1000
        case 'h': //hours
            return value * 60 * 60 * 1000
        case 'm': // minutes
            return value * 60 * 1000
        case 's': //seconds
            return value * 1000
        default:
            return 0
    }
}

module.exports = {
    parseExpiresIn
}