const express = require("express");
// Now using the userRouter from the express
const userRouter = express.Router();
// Importing the User Model to check whether the user exists or not
const userModel = require("../models/user.model");
// Importing the bcrypt js
const bcrypt = require("bcryptjs");

// Importing the cookie parser
const cookieParser = require("cookie-parser");

// Importing the Middleware for authentication
const authenticateUserMiddleware = require("../middlewares/autheticateUser.middleware");

// Creating the API for the User ------> Sign Up and Login

// Test --------------------- Sign up form Data -----------------------------
userRouter.post("/signup", async (req, res) => {
    console.log("Checking the data from client", req.body);
    const { username: name, enteredEmail, enteredPassword, confirmPassword } = req.body;

    if (!name || !enteredEmail || !enteredPassword || !confirmPassword) {
        return res.status(422).json({ error: "Please fill all the details" });
    }

    try {
        // Checking whether the User with the same email exsists or not
        const exsistingUser = await userModel.findOne({ email: enteredEmail });

        if (exsistingUser) {
            return res.status(422).json({ error: "Email already exsists" });
        } else if (enteredPassword !== confirmPassword) {
            return res.status(422).json({ error: "Password doesn't match" });
        } else {
            const newUser = await new userModel({
                name,
                email: enteredEmail,
                password: enteredPassword,
                confirmPassword,
            });
            console.log("Values of the newUser", newUser);

            const finalUser = await newUser.save();
            console.log("Saving the newUser", finalUser);
            return res.status(200).json(finalUser);
        }

    } catch (error) {
        console.log("Catch block error", error);
        return res.status(422).json({ message: "Catch block error", error });
    }

    //return res.status(200).send(req.body);
})

// Test --------------------- Login form data -------------------------------
userRouter.post("/login", async (req, res) => {
    console.log("Checking the data from client ---> Login", req.body);
    const { enteredEmail, enteredPassword } = req.body;

    if (!enteredEmail || !enteredPassword) {
        return res.status(422).json({ error: "Please fill all the details" });
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
                const jwtToken = await findUser.generateAuthToken();
                // Checking whether we are getting the token or not 
                console.log("JWT Token Generated", jwtToken);

                // Now passing this token into the cookie
                res.cookie("authToken", jwtToken, {
                    httpOnly: true,
                });

                // Sending the Result to the frontend
                const result = {
                    isValidUser,
                    findUser,
                    jwtToken,
                }

                console.log("Result of /login", result);
                return res.status(200).json({ message: "User found", result });
            } else {
                console.log("Email or password is wrong");
                return res.status(422).json({ error: "Email or password is wrong" });
            }

        } else {
            console.log("User doesn't exsists");
            return res.status(422).json({ error: "User does not exsist" });
        }

    } catch (error) {
        // Converts JS object into JSON
        console.log("Catch block error", error);
        return res.status(422).json({ message: "Catch block error", error });
    }
})

// Test ---------------------- GET /logout to remove AuthToken and cookie ----------------
userRouter.get("/logout", authenticateUserMiddleware, (req, res) => {
    // First we need to check whether the usr is valid or not, if not valid, then why logout 
    // To check the user is authentic or not we use the authenticate middleware
    console.log("On /logout Route");

    // We are getting the many things in return, so we will use that 
    try {
        // This token array will contain all the token, to tell user how many times he logged In
        // Every time new token is generated, so will contain all token instead of the current token
        req.user.tokens = req.user.tokens.filter((currentToken) => currentToken !== req.token)

        // After this we have to remove the Cookie
        res.clearCookie("authToken", { path: "/" });

        // Saving the new token array into the database
        req.user.save();

        // Now passing the user data to the client
        return res.status(201).json({ user: req.user })
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: "Logout Error occured !! Please Try Again ", error })
    }
});

// Test ---------------------- Exporting all the routes ---------------------
module.exports = userRouter;