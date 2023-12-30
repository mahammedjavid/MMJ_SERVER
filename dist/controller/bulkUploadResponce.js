"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bulkUploadResponce_1 = require("../services/bulkUploadResponce");
const apiResponce_1 = __importDefault(require("../helper/apiResponce"));
const router = (0, express_1.Router)();
router.route("/").get(getAllBulkresponce);
function getAllBulkresponce(req, res, next) {
    (0, bulkUploadResponce_1._getBulkResponceService)()
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
