// Entry Point

// Test --------------------------- Loading all Dependencies ------------------
const express = require("express");

// Using the cors package for passing data from frontend to backend, as they will be running on different ports
const cors = require("cors");

// Using the dotenv package for better security
require("dotenv").config();

// Creating an express application named app
const app = express();

// Test --------------------------- Fetching all files / config ---------------
// Now importing / accessing the database connection
const db = require("./db/connection");

// Now importing the different routes defined
const commonRouter = require("./routes/common.route");
const userRouter = require("./routes/user.route");

// Test --------------------------- Adding required middlewares --------------
// For error free data passing from frontend to backend and vice-versa
app.use(cors());

// Converting the data received from frontend into JSON for the Backend
app.use(express.json());

// Using the routes defined for different paths
app.use(commonRouter);
app.use(userRouter);

// Test --------------------------- Running the server ------------------------
// Defining the PORT on which our server will be running
const PORT = 8000 || process.env.PORT;

// Starts the server on the given PORT ----> MOST IMP LINE
app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`)
})