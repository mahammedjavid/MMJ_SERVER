"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const apiResponce_1 = __importDefault(require("../helper/apiResponce"));
const customer_1 = require("../services/customer");
const router = (0, express_1.Router)();
router.route("/").get(passport_1.default.authenticate('jwt', { session: false }), getAllUserList);
router.post("/login", createCustomer);
router.post("/verify-otp", verifyOTP);
function createCustomer(req, res, next) {
    (0, customer_1._createCustomerService)(req)
        .then((result) => res.json((0, apiResponce_1.default)({
        data: result.data,
        status: "OK",
        message: result.message,
    })))
        .catch((err) => {
        res.json((0, apiResponce_1.default)({
            data: "",
            status: false,
            message: err.message,
        }));
    });
}
async function verifyOTP(req, res, next) {
    (0, customer_1.verifyOTPService)(req)
        .then((result) => res.json((0, apiResponce_1.default)({
        data: result.data,
        status: "OK",
        message: result.message,
        access_token: result.access_token,
        refresh_token: result.refresh_token
    })))
        .catch((err) => {
        res.json((0, apiResponce_1.default)({
            data: "",
            status: false,
            message: err.message,
        }));
    });
}
function getAllUserList(req, res, next) {
    (0, customer_1._getAllUserListervice)()
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
