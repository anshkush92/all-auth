// Importing the Express module (library/file)
const express = require("express");

// Creating an express application named app
const app = express();

// Defining the PORT on which our server will be running
const PORT = 8000 || process.env.PORT;

// Sending the Response, when getting "/" in the Request
app.get("/", (req, res) => {
    res.send("Hello World");
});

// Starts the server on the given PORT ----> MOST IMP LINE
app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`)
})