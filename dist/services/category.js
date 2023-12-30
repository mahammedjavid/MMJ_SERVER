"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._createCategoryService = exports._getcategoryListService = void 0;
const index_1 = require("../relation/index");
const payloadValidation_1 = require("../helper/payloadValidation");
async function _getcategoryListService() {
    try {
        const category = await index_1.CategoryTable.findAll();
        return {
            data: category,
            message: 'Category list retrieved successfully',
        };
    }
    catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
}
exports._getcategoryListService = _getcategoryListService;
async function _createCategoryService(req) {
    try {
        const { category_name } = req.body;
        const requiredFields = ['category_name'];
        (0, payloadValidation_1.validatePayload)(req.body, requiredFields);
        let existingCategory = await index_1.CategoryTable.findOne({
            where: { category_name },
        });
        if (existingCategory) {
            throw new Error('Category Already Exists');
        }
        // For single image upload
        // let uploadedImage = await uploadToS3(req.file.buffer, req.file.originalname, req.file.mimetype);
        let uploadedImage = req.file.originalname;
        // Create the category in the database
        const newCategory = await index_1.CategoryTable.create({
            category_image: uploadedImage,
            category_name,
        });
        return {
            data: newCategory,
            message: 'Category Created successfully',
        };
    }
    catch (error) {
        console.error('Error in _createCategoryService:', error);
        throw error;
    }
}
exports._createCategoryService = _createCategoryService;
