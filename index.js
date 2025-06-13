const express = require("express");
const cookieParser = require("cookie-parser");
const { PORT } = require("./src/config/configEnv.js");
const errorHandler = require("./src/middleware/error.js");
const authRouter = require("./src/routes/authRoutes.js");
const appRouter = require("./src/routes/appRoutes.js");

/* initializing express app */
const app = express();

/* using cookie parser to parse cookies */
app.use(cookieParser());

/* using in built middleware to parse JSON payload */
app.use(express.json());

/* Routes */
app.use("/api/user", authRouter);
app.use("/api/admin", appRouter);

/* Error handling */
app.use(errorHandler);

/* App listening */
app.listen(PORT, async (err) => {
  if (err) console.log(`Error in connecting to Port: ${PORT}`);
  else {
    console.log(`Server running in Port: ${PORT}`);
  }
});
