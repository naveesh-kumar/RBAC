const bcrypt = require("bcrypt");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/generateToken.js");
const {
  readFileHandler,
  writeFileHandler,
} = require("../utils/fileHandler.js");
const { SALT } = require("../config/configEnv.js");

const refreshTokens = new Map();

const registerUser = async (req, res) => {
  const { username, password, role } = req.body;
  if (!username || !password || !role) {
    return res.status(400).json({
      status: 400,
      message: "All fields are required",
    });
  }
  try {
    const users = await readFileHandler();
    const hashPassword = await bcrypt.hash(password, SALT);
    /* Registering user */
    users.push({
      id: users.length + 1,
      username,
      password: hashPassword,
      role,
    });
    await writeFileHandler(users);
    res.status(201).json({
      status: 201,
      message: "User successfully Registerd",
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Internal Server Error",
      Error: err.message,
    });
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      status: 400,
      message: "All fields are required",
    });
  }

  try {
    const users = await readFileHandler();
    const user = users.find(
      (user) => user.username.toLowerCase() === username.toLowerCase()
    );
    /* user not identified */
    if (!user) {
      return res.status(401).json({
        status: 401,
        message: "Unauthorized Access",
      });
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    /* user password not matched */
    if (!isPasswordMatched) {
      return res.status(401).json({
        status: 401,
        message: "Unauthorized Access",
      });
    }

    /* user authenticated */
    const accessToken = generateAccessToken({
      id: user.id,
      username: user.username,
      role: user.role,
    });

    /* Sending refresh token */
    const refreshToken = generateRefreshToken({
      id: user.id,
      username: user.username,
      role: user.role,
    });

    /* Store refresh token */
    refreshTokens.set(refreshToken, {
      id: user.id,
      username: user.username,
      role: user.role,
      expiresIn: "7d",
    });

    res.cookie("app_token", accessToken, {
      httpOnly: true, // prevents client side accessing
      sameSite: "lax",
      maxAge: 900000,
      secure: false,
    });

    res.status(200).json({
      status: 200,
      message: "Login successful",
      refreshToken,
    });

    return refreshToken;
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Internal Server Error",
      Error: err.message,
    });
  }
};

const refresh = async (req, res) => {
  const reqUser = req.user;
  const reqRefreshToken = req.refreshToken;

  /* check if the refreshToken is same as the one stored in memory */
  const tokenUser = refreshTokens.get(reqRefreshToken);

  /* If not valid refresh token */
  if (tokenUser?.id !== reqUser?.id) {
    return res.status(401).json({
      status: 401,
      message: "Invalid or Expired Refresh Token",
    });
  }

  /* If valid refresh token */
  try {
    const users = await readFileHandler();
    const user = users.find((user) => user.id === reqUser.id);

    /* Sending refresh token */
    const refreshToken = generateRefreshToken({
      id: user.id,
      username: user.username,
      role: user.role,
    });

    /* delete previous refresh token */
    refreshTokens.delete(reqRefreshToken);

    /* Store fresh refresh token */
    refreshTokens.set(refreshToken, {
      id: user.id,
      username: user.username,
      role: user.role,
      expiresIn: "7d",
    });

    res.status(200).json({
      status: 200,
      message: "Refresh token successfully generated",
    });

    return refreshToken;
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Internal Server Error hello",
      Error: err.message,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  refresh,
};
