// Model ---> Table,  Schema ---> Columns in Table --------> Analogy to Relational Database
const { Schema, Model } = require("mongoose");
const validator = require("validator");

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

// Creating the Model ------>  Can be seen as table in the Relational Database 
// "users" ---> Table has "userSchema" ----> columns and we access it by userModel
const userModel = new Model("users", userSchema);

// Exporting the created model (table) 
module.exports = userModel; 