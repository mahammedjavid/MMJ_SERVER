"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const customer_1 = __importDefault(require("../controller/customer"));
const product_1 = __importDefault(require("../controller/product"));
const cart_1 = __importDefault(require("../controller/cart"));
const wishList_1 = __importDefault(require("../controller/wishList"));
const category_1 = __importDefault(require("../controller/category"));
const bulkUploadResponce_1 = __importDefault(require("../controller/bulkUploadResponce"));
const passportAuth_1 = require("../helper/passportAuth");
const passport_1 = __importDefault(require("passport"));
const app = (0, express_1.default)();
(0, passportAuth_1.passPOrtAuth)(passport_1.default);
// passport.authenticate('jwt',{session:false}) //add this middleware to authenticate route
app.get('/', (req, res) => {
    res.send('Welcome to MMJ Server!');
});
app.use("/user", customer_1.default);
app.use("/product", product_1.default);
app.use("/cart", cart_1.default);
app.use("/wish-list", wishList_1.default);
app.use('/categories', category_1.default);
app.use('/bulk-responce', bulkUploadResponce_1.default);
exports.default = app;
