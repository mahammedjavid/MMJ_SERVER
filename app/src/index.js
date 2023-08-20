var express = require("express");
var app = express();
const userRoutes = require("../src/users/controllers/userController");
const productRoute = require("../src/product/controller/productController");
const cartRoute = require("../src/cart/controller/cartContoller");
const categoryRoutes = require("../src/category/controller/categoryController");
const {verifyAccessToken} = require('../helper/jwtToken.js')
const { passPOrtAuth } = require('../helper/passportAuth')
const passport = require('passport')
passPOrtAuth(passport)
// Routes
/**
 * Authentication API's are implemented
 * /api/account/* are auth API's
 */
app.use("/user", userRoutes);
app.use("/product", productRoute);
app.use("/cart",passport.authenticate('jwt',{session:false}), cartRoute);
app.use('/categories', categoryRoutes);

module.exports = app;