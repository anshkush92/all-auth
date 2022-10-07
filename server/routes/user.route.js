const express = require("express");
// Now using the userRouter from the express
const userRouter = express.Router();
// Importing the User Model to check whether the user exists or not
const userModel = require("../models/user.model");

// Creating the API for the User ------> Sign Up and Login

// Test --------------------- Sign up form Data -----------------------------
userRouter.post("/signup", async (req, res) => {
    console.log(req.body);
    const { username: name, enteredEmail, enteredPassword, confirmPassword } = req.body;

    // Warning to fill up all the details
    if (!name || !enteredEmail || !enteredPassword || !confirmPassword) {
        res.status(422).json({ error: "Please fill all the details" });
    }

    // Checking whether the user is already registerd or not using the Email as it is unique
    try {
        // Checks whether the enteredEmail exsists in the userModel Table or not 
        const exsistingUser = await userModel.findOne({ email: enteredEmail });
        // If we user exsists, then we throw an error
        if (exsistingUser) {
            res.status(422).json({ error: "User already exsists" });
        } else if (enteredPassword !== confirmPassword) {
            res.status(422).json({ error: "Password doesn't match" });
        } else {
            const newUser = new userModel({
                name,
                email: enteredEmail,
                password: enteredPassword,
                confirmPassword,
            })
            console.log(newUser);
        }

    } catch (error) {

    }

    res.status(200).send(req.body);
})

// Test --------------------- Login form data -------------------------------
userRouter.post("/login", (req, res) => {
    console.log(`Data from the login form ${req.body}`);
})

// Test ---------------------- Exporting all the routes ---------------------
module.exports = userRouter;