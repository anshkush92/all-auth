// Middleware to check whether the user is authentic or not 

// Test ------------------ Dependencies for the middlewares ----------------------
const jwt = require("jsonwebtoken");
const userSchema = require("../models/user.model");
const jwtSecretKey = process.env.JWT_SECRET_KEY;

// Test ------------------ The middleware function -------------------------------
// Since this is a middleware function so we need to use the next() otherwise the control will get stuck on that middleware func only
const authenticateUser = async (req, res, next) => {
    try {
        // Getting the token from the header -----> Make sure to use the "a" instead of "A" in Authorization
        const token = req.headers.authorization;

        // On verifying the JWT Token, we will get the "Payload" which we used to create the token
        const verifyJwtToken = jwt.verify(token, jwtSecretKey);

        // On getting the "Payload", now we will "check", whether this "certain id" exsists or not in DB or not
        const isValidUser = await userSchema.findOne({ _id: verifyJwtToken.id });

        console.log("JWT Secret Key: ", jwtSecretKey, "\nJWT Token for /user: ", token, "\nIs JWT correct ?", verifyJwtToken);
        console.log("User credentials: ", isValidUser);

        if (!isValidUser) {
            throw new Error("User not found");
        }

        // Setting these values, when we have got the user 
        req.token = token;
        req.user = isValidUser;
        req.userId = isValidUser._id;

    } catch (error) {
        console.log(error);
        res.status(401).json({ message: "Unauthorized Access" });
    }

    console.log("In Authenticate User Middleware");
    next();
}

// Test ------------------ Exporting the middleware function --------------------
module.exports = authenticateUser;