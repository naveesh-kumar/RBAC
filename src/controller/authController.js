const bcrypt = require("bcrypt")
const generateToken = require("../utils/generateToken.js");
const { readFileHandler, writeFileHandler } = require("../utils/fileHandler.js");
const { SALT } = require("../config/configEnv.js");


const registerUser = async (req, res) => {
    const { username, password, role } = req.body;
    if (!username || !password || !role) {
        return res.status(400).json({
            status: 400,
            message: 'All fields are required'
        })
    }
    try {
        const users = await readFileHandler();
        const hashPassword = await bcrypt.hash(password, SALT);
        /* Registering user */
        users.push({
            id: users.length + 1,
            username,
            password: hashPassword,
            role
        })
        await writeFileHandler(users);
        res.status(201).json({
            status: 201,
            message: "User successfully Registerd"
        })
    } catch (err) {
        res.status(500).json({
            status: 500,
            message: "Internal Server Error",
            Error: err.message
        })
    }

}

const loginUser = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({
            status: 400,
            message: 'All fields are required'
        })
    }

    try {
        const users = await readFileHandler();
        const user = users.find(user => user.username.toLowerCase() === username.toLowerCase());
        /* user not identified */
        if (!user) {
            return res.status(401).json({
                status: 401,
                message: "Unauthorized Access"
            })
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password);

        /* user password not matched */
        if (!isPasswordMatched) {
            return res.status(401).json({
                status: 401,
                message: "Unauthorized Access"
            })
        }

        /* user authenticated */
        const token = generateToken({
            id: user.id,
            username: user.username,
            role: user.role
        });

        res.cookie('app_token', token, {
            httpOnly: true, // prevents client side accessing
            sameSite: 'lax',
            maxAge: 3600000,
            secure: false
        })

        res.status(200).json({
            status: 200,
            message: "Login successful"
        })

    } catch (err) {
        res.status(500).json({
            status: 500,
            message: "Internal Server Error",
            Error: err.message
        })
    }

}

module.exports = {
    registerUser,
    loginUser
}