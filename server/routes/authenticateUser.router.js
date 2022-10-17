// Test -------------- Dependencies for the Route ---------------------------------------------------
const express = require("express");
const userSchema = require("../models/user.model");
const authenticateUserRouter = express.Router();
const authenticateUserMiddleware = require("../middlewares/autheticateUser.middleware");

// Test --------------- GET /user to check whether user is authenticate or not -----------------------
authenticateUserRouter.get("/user", authenticateUserMiddleware, async (req, res) => {
    console.log("In authenticate user Router /user");

    // Again validating the user in this route
    try {
        // Checking again whether the user is valid or not 
        const isValidUser = await userSchema.findOne({ _id: req.userId });
        console.log("Is Valid User ?", isValidUser);

        if (isValidUser) {
            res.status(200).json({ message: "The user is Valid", user: isValidUser });
        } else {
            res.status(401).json({ message: "The user is not Valid", user: isValidUser });
        }
    } catch (error) {
        res.status(401).json({ message: "Error", error })
        console.log(error);
    }
});

// Test --------------- Exporting the authenicate User Router ---------------------------------------
module.exports = authenticateUserRouter;