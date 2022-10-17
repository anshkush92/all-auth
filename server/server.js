// Entry Point

// Test --------------------------- Loading all Dependencies ------------------
const express = require("express");

// Using the cors package for passing data from frontend to backend, as they will be running on different ports
const cors = require("cors");

// Using the dotenv package for better security
require("dotenv").config();

// Creating an express application named app
const app = express();

// Requiring the cookie parser
const cookieParser = require("cookie-parser");

// Test --------------------------- Fetching all files / config ---------------
// Now importing / accessing the database connection
const db = require("./db/connection");

// Now importing the different routes defined
const commonRouter = require("./routes/common.route");
const userRouter = require("./routes/user.route");
const authenticateUserRouter = require("./routes/authenticateUser.router");

// Test --------------------------- Adding required middlewares --------------
// For error free data passing from frontend to backend and vice-versa
app.use(cors());

// Converting the data received from frontend JSON to JS Object for the Backend
app.use(express.json());

// Using the cookie parser to control cookies easily
app.use(cookieParser());

// Using the routes defined for different paths
app.use(commonRouter);
app.use(userRouter);
app.use(authenticateUserRouter);

// Test --------------------------- Running the server ------------------------
// Defining the PORT on which our server will be running
const PORT = 8000 || process.env.PORT;

// Starts the server on the given PORT ----> MOST IMP LINE
app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`)
})