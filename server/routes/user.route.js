const express = require("express");
// Now using the userRouter from the express
const userRouter = express.Router();
// Importing the User Model to check whether the user exists or not
const userModel = require("../models/user.model");
// Importing the bcrypt js
const bcrypt = require("bcryptjs");

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
userRouter.post("/login", async (req, res) => {
    console.log("Checking the data from client ---> Login", req.body);
    const { enteredEmail, enteredPassword } = req.body;

    if (!enteredEmail || !enteredPassword) {
        res.status(422).json({ error: "Please fill all the details" });
    }

    try {
        const findUser = await userModel.findOne({ email: enteredEmail });
        console.log("FindUser", findUser);

        if (findUser) {
            console.log("Find User if");
            const isValidUser = await bcrypt.compare(enteredPassword, findUser.password);
            console.log("isValidUser", isValidUser);

            if (isValidUser) {
                console.log("User found");
                // Firing the generateToken to generate the token for the valid user
                const token = await findUser.generateAuthToken();
                // Checking whether we are getting the token or not 
                console.log("JWT Token Generated", token);
                
                res.status(200).json({ message: "User found" });
            } else {
                console.log("Email or password is wrong");
                res.status(422).json({ error: "Email or password is wrong" });
            }

        } else {
            console.log("User doesn't exsists");
            res.status(422).json({ error: "User does not exsist" });
        }

    } catch (error) {
        // Converts JS object into JSON
        res.status(422).json(error);
    }
})

// Test ---------------------- Exporting all the routes ---------------------
module.exports = userRouter;