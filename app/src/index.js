var express = require("express");
var app = express();
const userRoutes = require("../src/users/controllers/userController");
const productRoute = require("../src/product/controller/productController");

// Routes
/**
 * Authentication API's are implemented
 * /api/account/* are auth API's
 */
app.use("/user", userRoutes);
app.use("/product", productRoute);

module.exports = app;