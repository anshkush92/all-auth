// Middleware to check whether the user is authentic or not 

// Test ------------------ Dependencies for the middlewares ----------------------
const jwt = require("jsonwebtoken");
const userSchema = require("../models/user.model");
const jwtSecretKey = process.env.JWT_SECRET_KEY;

// Test ------------------ The middleware function -------------------------------
// Since this is a middleware function so we need to use the next() otherwise the control will get stuck on that middleware func only
const authenticateUser = async (req, res, next) => {
    try {
        const token = req.headers.Authorization;
        console.log(token);
    } catch (error) {
        console.log(error);
    }
    console.log("In Authenticate User Middleware");
    next();
}

// Test ------------------ Exporting the middleware function --------------------
module.exports = authenticateUser;