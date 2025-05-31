const fs = require('fs').promises;
const path = require('path');

/* DON'T STORE DATA LIKE THIS IN FILE IN PRODUCTION */

const USERS_FILE_PATH = path.join(__dirname, "../data/users.json");

const writeFileHandler = async (users) => {
    await fs.writeFile(USERS_FILE_PATH, JSON.stringify(users, null, 2));
}

const readFileHandler = async () => {
    try {
        const data = await fs.readFile(USERS_FILE_PATH, 'utf-8');
        return JSON.parse(data || '[]');
    } catch (err) {
        if (err.code = "ENOENT") return []
        throw (err)
    }
}

module.exports = {
    readFileHandler,
    writeFileHandler
}
