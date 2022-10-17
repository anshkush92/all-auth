const express = require("express");
const authenticateUserRouter = express.Router();
const authenticateUserMiddleware = require("../middlewares/autheticateUser.middleware");

// Test --------------- GET /user to check whether user is authenticate or not -----------------------
authenticateUserRouter.get("/user", authenticateUserMiddleware, async (req, res) => {
    console.log("In authenticate user Router /user");
    res.status(200).json({ message: "Request to /user to authenticate user" });
});

// Test --------------- Exporting the authenicate User Router ---------------------------------------
module.exports = authenticateUserRouter;