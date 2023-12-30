"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const product_1 = require("../services/product");
const apiResponce_1 = __importDefault(require("../helper/apiResponce"));
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage: storage });
const router = (0, express_1.Router)();
router
    .route("/")
    .post(passport_1.default.authenticate('jwt', { session: false }), upload.array("product_image"), createProduct)
    .get(getProductList);
router
    .route("/:id")
    .get(getSingleProduct)
    .put(passport_1.default.authenticate('jwt', { session: false }), upload.array("product_image"), updateProduct)
    .delete(passport_1.default.authenticate('jwt', { session: false }), deactivateProduct);
// Bulk Upoload
router.post("/bulk-create", passport_1.default.authenticate('jwt', { session: false }), upload.single("productFile"), createBulkProducts);
function createProduct(req, res, next) {
    (0, product_1._createProductService)(req, res)
        .then((result) => {
        console.log(result);
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
// Product list api
function getProductList(req, res, next) {
    (0, product_1._getProductListService)(res)
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
// Single product
function getSingleProduct(req, res, next) {
    (0, product_1._getSingleProductService)(req, res)
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
// Update product api
function updateProduct(req, res, next) {
    (0, product_1._updateProductService)(req, res)
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
//Deactivateproduct
async function deactivateProduct(req, res, next) {
    const productId = req.params.id;
    try {
        await (0, product_1._deactivateProductService)(req, res);
        res.json((0, apiResponce_1.default)({
            status: true,
            message: "Product deactivated successfully",
        }));
    }
    catch (err) {
        res.json((0, apiResponce_1.default)({
            status: false,
            message: err.message,
        }));
    }
}
// ! Bulk Upload 
// ? Create Product
function createBulkProducts(req, res, next) {
    (0, product_1._createBulkProductsService)(req, res)
        .then((result) => {
        res.json((0, apiResponce_1.default)({
            data: result.data,
            status: true,
            message: result.message,
            downloadLink: result.downloadLink
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
