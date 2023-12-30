"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports._createBulkProductsService = exports._deactivateProductService = exports._updateProductService = exports._getSingleProductService = exports._getProductListService = exports._createProductService = void 0;
const index_1 = require("../relation/index");
const csvToJson_1 = require("../helper/csvToJson");
const JsonTocsv_1 = require("../helper/JsonTocsv");
const getTheUserInfoFromAccessToken_1 = require("../helper/getTheUserInfoFromAccessToken");
const payloadValidation_1 = require("../helper/payloadValidation");
const generateSKU_1 = __importDefault(require("../utils/generateSKU"));
async function _createProductService(req, res) {
    try {
        const { product_description, price, stock, product_title, category_id, product_other_info, } = req.body;
        const requiredFields = [
            "product_description",
            "price",
            "stock",
            "product_title",
            "category_id",
        ];
        (0, payloadValidation_1.validatePayload)(req.body, requiredFields);
        // !For single image upload
        // let uploadedImage =  uploadToS3(req.file.buffer, req.file.originalname, req.file.mimetype);
        // Create the product in the database
        // const newProduct = await ProductTable.create({
        //   product_image: uploadedImage,
        //   SKU,
        //   description,
        //   price,
        //   stock,
        // });
        let uploadedImageUrls = [];
        // !For multiple image upload
        req.files.map(async (file) => {
            // let image = await uploadToS3(file.buffer, file.originalname,file.mimetype) //s3 link
            let image = file.originalname; // for testing purposes
            uploadedImageUrls.push(image);
        });
        let lastProduct = await index_1.ProductTable.findOne({
            order: [['SKU', 'DESC']],
        });
        const SKU = (0, generateSKU_1.default)(lastProduct?.SKU || 'MMJ00000');
        const productImagesString = JSON.stringify(uploadedImageUrls);
        const modifiedProduct = {
            product_images: productImagesString,
            product_title,
            SKU,
            product_description,
            price,
            stock,
            category_id,
            product_other_info,
        };
        let existingProduct = await index_1.ProductTable.findOne({
            where: { SKU },
        });
        if (existingProduct) {
            throw new Error("Product Already Exists");
        }
        let categoryExist = await index_1.CategoryTable.findOne({
            where: { category_id },
        });
        if (!categoryExist) {
            throw new Error("Category not found");
        }
        const product = await index_1.ProductTable.create(modifiedProduct);
        return {
            data: product,
            message: "Product Created successfully",
        };
    }
    catch (error) {
        console.error("Error in _createCustomerService:", error);
        throw error;
    }
}
exports._createProductService = _createProductService;
// Product list service
async function _getProductListService(res) {
    try {
        let where_clause = {
            isActive: true,
        };
        // Fetch the list of products from the database
        const productList = await index_1.ProductTable.findAll({
            where: where_clause,
            include: [index_1.CategoryTable],
        });
        return {
            data: productList,
            message: "Product list retrieved successfully",
        };
    }
    catch (error) {
        console.error("Error in _getProductListService:", error);
        throw error;
    }
}
exports._getProductListService = _getProductListService;
// Single product api
async function _getSingleProductService(req, res) {
    try {
        const productId = req.params.id;
        const product = await index_1.ProductTable.findOne({
            where: {
                product_id: productId,
                isActive: true,
            },
        });
        if (!product) {
            throw new Error("Product not found");
        }
        return {
            data: product,
            message: "Product retrieved successfully",
        };
    }
    catch (error) {
        console.error("Error in _getSingleProductService:", error);
        throw error;
    }
}
exports._getSingleProductService = _getSingleProductService;
// Update product
async function _updateProductService(req, res) {
    const productId = req.params.id;
    const updatedData = req.body;
    try {
        // Fetch the product by its ID from the database
        const product = await index_1.ProductTable.findByPk(productId);
        if (!product) {
            throw new Error("Product not found");
        }
        // Update the S3 links and other data based on updatedData
        // if (updatedData.product_images) {
        //   const updatedImageUrls = await Promise.all(
        //     updatedData.product_images.map(async (image) => {
        //       const updatedImage = await uploadToS3(
        //         image.buffer,
        //         image.originalname,
        //         image.mimetype
        //       );
        //       return updatedImage;
        //     })
        //   );
        //   product.product_images = updatedImageUrls;
        // }
        // Update other fields if needed
        product.product_other_info =
            updatedData.product_other_info || product.product_other_info;
        product.price = updatedData.price || product.price;
        product.stock = updatedData.stock || product.stock;
        product.category_id = updatedData.category_id || product.category_id;
        product.product_title = updatedData.product_title || product.product_title;
        product.product_description =
            updatedData.product_description || product.product_description;
        let categoryExist = await index_1.CategoryTable.findOne({
            where: { category_id: product.category_id },
        });
        if (!categoryExist) {
            throw new Error("Category not found");
        }
        // Save the changes to the database
        await product.save();
        return {
            data: product,
            message: "Product updated successfully",
        };
    }
    catch (error) {
        console.error("Error in _updateProductService:", error);
        throw error;
    }
}
exports._updateProductService = _updateProductService;
// Deactivate product service
async function _deactivateProductService(req, res) {
    const productId = req.params.id;
    try {
        const product = await index_1.ProductTable.findByPk(productId);
        if (!product) {
            throw new Error("Product not found");
        }
        product.isActive = false; // Deactivate the product
        await product.save();
        return;
    }
    catch (error) {
        console.error("Error in _deactivateProductService:", error);
        throw error;
    }
}
exports._deactivateProductService = _deactivateProductService;
// !Bulk Upload Service
async function _createBulkProductsService(req, res) {
    try {
        const allProduct = await index_1.ProductTable.findAll();
        const user = (0, getTheUserInfoFromAccessToken_1.getTheUserInfoFromJwt)(req)?.userDetails;
        // new bulk upload flow
        const data = await (0, csvToJson_1.convertCsvToListOfObject)(req.file);
        let lastProduct = await index_1.ProductTable.findOne({
            order: [['SKU', 'DESC']],
        });
        console.log("last Product ------------------", lastProduct);
        const modifiedProducts = data.map((product, index) => {
            const existingProduct = allProduct.find((existing) => existing.SKU === product.SKU);
            // Initialize a 'status' key in each product object
            product.status = true;
            product.message = "Success";
            // Check if the price is a valid number and not negative
            if (isNaN(Number(product.price)) || Number(product.price) < 0) {
                product.status = false;
                product.message = "Price is not valid";
            }
            if (existingProduct) {
                // SKU exists in the database
                product.status = false;
                product.message = "Product already exists";
            }
            //!category check confition
            // let category_id = await CategoryTable.findOne({where : {category_id : product.category_id} })
            // if(!product.category_id || !category_id){
            //   product.status = false;
            //   product.message = "Invalid Category ID: ";
            // } 
            if (product.status) {
                product.SKU = (0, generateSKU_1.default)(index === 0 ? lastProduct?.SKU || 'MMJ00000' : data[index - 1].SKU);
            }
            return product;
        });
        const content = await (0, JsonTocsv_1.convertObjectListToCsv)(modifiedProducts);
        const downloadLink = `data:text/csv;charset=utf-8,${encodeURIComponent(content)}`;
        const s3Link = "s3link"; // await uploadToS3(file.fileBuffer, file.originalname, file.fileType);
        const bulk = {
            fileName: req.file.originalname,
            fileLink: s3Link,
            message: "Uploaded successfully",
            customer_id: user.customer_id,
        };
        const bulkUploadResponse = await index_1.BulkUploadTable.create(bulk);
        const successfulProducts = modifiedProducts.filter((product) => product.status && product.message == "Success");
        let productCreateResponse = "";
        if (successfulProducts.length) {
            productCreateResponse = await index_1.ProductTable.bulkCreate(successfulProducts);
        }
        return {
            data: productCreateResponse,
            downloadLink: downloadLink,
            message: "Bulk uploaded successfully",
        };
    }
    catch (error) {
        console.error("Error in _createBulkProductsService:", error);
        throw error;
    }
}
exports._createBulkProductsService = _createBulkProductsService;
