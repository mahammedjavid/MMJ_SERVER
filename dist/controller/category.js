"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const category_1 = require("../services/category");
const apiResponce_1 = __importDefault(require("../helper/apiResponce"));
const router = (0, express_1.Router)();
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage });
router
    .route("/")
    .get(getAllCategory)
    .post(upload.single("category_image"), createCategory);
async function getAllCategory(req, res, next) {
    try {
        const result = await (0, category_1._getcategoryListService)();
        res.json((0, apiResponce_1.default)({
            data: result.data,
            status: true,
            message: result.message,
        }));
    }
    catch (err) {
        res.json((0, apiResponce_1.default)({
            data: "",
            status: false,
            message: err.message,
        }));
    }
}
async function createCategory(req, res, next) {
    try {
        const result = await (0, category_1._createCategoryService)(req);
        console.log(result);
        res.json((0, apiResponce_1.default)({
            data: result.data,
            status: true,
            message: result.message,
        }));
    }
    catch (err) {
        res.json((0, apiResponce_1.default)({
            data: "",
            status: false,
            message: err.message,
        }));
    }
}
exports.default = router;
