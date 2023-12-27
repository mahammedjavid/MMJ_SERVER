var express = require("express");
var app = express();
const userRoutes = require("./users/controllers/userController");
const productRoute = require("../src/product/controller/productController");
const cartRoute = require("../src/cart/controller/cartContoller");
const wishListRoute = require("../src/wishlist/controller/wishListController");
const categoryRoutes = require("../src/category/controller/categoryController");
const BulkResponceRoute = require("../src/bulk-upload-responce/controller/bulkUploadController");
const { verifyAccessToken } = require('../helper/jwtToken.js') //used passport for route authorization
const { passPOrtAuth } = require('../helper/passportAuth')
const passport = require('passport')
passPOrtAuth(passport)
// passport.authenticate('jwt',{session:false}) add this middleware to authenticate route
app.get('/', (req, res) => {
    res.send('Welcome to MMJ Server!');
});
app.use("/user", userRoutes);
app.use("/product", productRoute);
app.use("/cart", cartRoute);
app.use("/wish-list", wishListRoute);
app.use('/categories', categoryRoutes);
app.use('/bulk-responce', BulkResponceRoute);

module.exports = app;