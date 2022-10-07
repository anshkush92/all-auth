// Importing the mongoose package
const mongoose = require("mongoose");

// Connecting our application to the mongo Db by using the URL
// URL Format ----> "mongodb://<username>:<password>@<cluster>/<database>"
const db = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@userauth.k6h2g.mongodb.net/all-authentication?retryWrites=true&w=majority`;

// Connecting to the database by using .connect
// Returns the promise, so we can use the .then()
mongoose.connect(db, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
})
    .then(() => console.log("Successfully Connected to Database"))
    .catch((error) => console.log(error));
