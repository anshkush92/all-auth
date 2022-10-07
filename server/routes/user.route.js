const express = require("express");
// Now using the userRouter from the express
const userRouter = express.Router();

// Creating the API for the User ------> Sign Up and Login

// Test --------------------- Sign up form Data -----------------------------
userRouter.post("/signup", (req, res) => {
    console.log(`Data from the Sign Up form ${req.body}`);
})

// Test --------------------- Login form data -------------------------------
userRouter.post("/login", (req, res) => {
    console.log(`Data from the login form ${req.body}`);
})

// Test ---------------------- Exporting all the routes ---------------------
module.exports = userRouter;