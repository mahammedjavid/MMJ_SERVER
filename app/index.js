var express = require("express");
var app = express();
const userRoutes = require("./users/controllers/userController");

// Routes
/**
 * Authentication API's are implemented
 * /api/account/* are auth API's
 */
app.use("/user", userRoutes);

module.exports = app;