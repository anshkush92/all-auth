// Test -------------------------- Importing the Packagees ---------------------
const { Router } = require("express");

// Test -------------------------- Importing other modules ---------------------
const commonRouter = Router();

// Test --------------------------- Defining the Routes -------------------------
commonRouter.get("/", (req, res) => {
    console.log(`Directed at "/" route`);
    res.send("<h1>Server is up and Running</h1>");
})

// Test --------------------------- Exporting the Routes -----------------------
module.exports = commonRouter;