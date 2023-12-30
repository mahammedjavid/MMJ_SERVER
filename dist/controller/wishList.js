"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const wishList_1 = require("../services/wishList");
const apiResponce_1 = __importDefault(require("../helper/apiResponce"));
const router = (0, express_1.Router)();
router.route('/').get(getAllWishListItems).post(passport_1.default.authenticate('jwt', { session: false }), addToWishList);
function addToWishList(req, res, next) {
    (0, wishList_1._createWishListItemService)(req)
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
function getAllWishListItems(req, res, next) {
    (0, wishList_1._getWishListListService)(req)
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
