// Model ---> Table,  Schema ---> Columns in Table --------> Analogy to Relational Database
const { Schema, model } = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Test --------------------------- Creating the User Schema ----------------------------------
// Creating the schema for the User -------> How Column Name (relational database) will look like
const userSchema = new Schema({
    name: {
        // Type of the value we will receive
        type: String,
        // Making sure that value is written in DB, only if it has some value
        required: true,
        // To remove the extra space forward and backward
        trim: true,
    },

    email: {
        type: String,
        required: true,
        trim: true,
        // Making sure that the email is unique
        unique: true,
        // Checking at backend whether we are getting valid email or not
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Not a valid email");
            }
        }
    },

    password: {
        type: String,
        required: true,
        trim: true,
    },

    confirmPassword: {
        type: String,
        required: true,
        trim: true,
    },

    // For using it with the jwt
    tokens: [{
        token: {
            type: String,
            required: true,
        }
    }]
});

// Test ------------------------- Function fired before / after saving data in the database ------------
// This function is fired before the saving the user in the Database
// We don't get the doc, because ran before saving into database, so we need to use the this keyword to access the property as used in the database
// Use the function () {} instead of the () => {} function to avoid the errors
userSchema.pre('save', async function (next) {
    console.log(`Before saving user in database`, this);

    // Change the Encrypted password only when the password is modified not everytime
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 12);
        this.confirmPassword = await bcrypt.hash(this.confirmPassword, 12);
    }

    next();
});

// Test ------------------------- Creating the JWT Token for the user ------------------------------------
// Use the function () instead of the arrow functions to avoid common errors when dealing with MongoDB
// Runs before the userSchema.pre()
userSchema.methods.generateAuthToken = async function () {
    // To generate the token we need ----> Header, Payload, Secret Key
    console.log("Secret Key in JWT", process.env.JWT_SECRET_KEY, "Data from the Login Form", this);

    try {
        // Generate the token when the user is logged in successfully
        const generatedToken = jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
            expiresIn: 1 * 24 * 60 * 60,
        });
        // After geenrating the token, save it in the database in the tokens field
        this.tokens = this.tokens.concat({ token: generatedToken });
        // Saving the JWT token in the database
        await this.save();
        // Returning the generated token
        return generatedToken;
    } catch (error) {
        console.log("Catch block error", error);
        res.status(422).json(error);
    }
}

// Test ------------------------- Creating the Model and storing in the MongoDB ---------
// Creating the Model ------>  Can be seen as table in the Relational Database 
// "users" ---> Table has "userSchema" ----> columns and we access it by userModel
const userModel = new model("users", userSchema);


// Test --------------------------- Exporting the Model ---------------------------------
// Exporting the created model (table) 
module.exports = userModel; 