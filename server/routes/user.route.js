const express = require("express");
// Now using the userRouter from the express
const userRouter = express.Router();
// Importing the User Model to check whether the user exists or not
const userModel = require("../models/user.model");

// Creating the API for the User ------> Sign Up and Login

// Test --------------------- Sign up form Data -----------------------------
userRouter.post("/signup", async (req, res) => {
    console.log("Checking the data from client", req.body);
    const { username: name, enteredEmail, enteredPassword, confirmPassword } = req.body;

    if (!name || !enteredEmail || !enteredPassword || !confirmPassword) {
        res.status(422).json({ error: "Please fill all the details" });
    }

    try {
        // Checking whether the User with the same email exsists or not
        const exsistingUser = await userModel.findOne({ email: enteredEmail });

        if (exsistingUser) {
            res.status(422).json({ error: "Email already exsists" });
        } else if (enteredPassword !== confirmPassword) {
            res.status(422).json({ error: "Password doesn't match" });
        } else {
            const newUser = await new userModel({
                name,
                email: enteredEmail,
                password: enteredPassword,
                confirmPassword,
            });
            console.log("Values of the newUser", newUser);

            const finalUser = await newUser.save();
            console.log(finalUser);
            res.status(200).json(finalUser);
        }

    } catch (error) {
        res.status(422).json(error);
        console.log("Catch block error", error);
    }

    // res.status(200).send(req.body);
})

// Test --------------------- Login form data -------------------------------
userRouter.post("/login", (req, res) => {
    console.log(`Data from the login form ${req.body}`);
})

// Test ---------------------- Exporting all the routes ---------------------
module.exports = userRouter;