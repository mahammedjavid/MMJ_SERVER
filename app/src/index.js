var express = require("express");
var app = express();
const userRoutes = require("../src/users/controllers/userController");
const productRoute = require("../src/product/controller/productController");
const cartRoute = require("../src/cart/controller/cartContoller");

// Routes
/**
 * Authentication API's are implemented
 * /api/account/* are auth API's
 */
app.use("/user", userRoutes);
app.use("/product", productRoute);
app.use("/cart", cartRoute);

module.exports = app;