"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const cart_1 = require("../services/cart");
const apiResponce_1 = __importDefault(require("../helper/apiResponce"));
const router = (0, express_1.Router)();
router
    .route("/")
    .get(getAllCartItems)
    .post(passport_1.default.authenticate("jwt", { session: false }), addToCart);
function addToCart(req, res, next) {
    (0, cart_1._createCartItemService)(req)
        .then((result) => {
        res.json((0, apiResponce_1.default)({
            data: result.data,
            status: true,
            message: result.message,
        }));
    })
        .catch((err) => {
        res.json((0, apiResponce_1.default)({
            data: "",
            status: false,
            message: err.message,
        }));
    });
}
function getAllCartItems(req, res, next) {
    (0, cart_1._getCartListService)(req)
        .then((result) => {
        res.json((0, apiResponce_1.default)({
            data: result.data,
            status: true,
            message: result.message,
        }));
    })
        .catch((err) => {
        res.json((0, apiResponce_1.default)({
            data: "",
            status: false,
            message: err.message,
        }));
    });
}
exports.default = router;
