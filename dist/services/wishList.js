"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._getWishListListService = exports._createWishListItemService = void 0;
const index_1 = require("../relation/index");
const payloadValidation_1 = require("../helper/payloadValidation");
async function _createWishListItemService(req) {
    try {
        const { customer_id, product_id } = req.body;
        // Check if required fields are provided
        const requiredFields = ["customer_id", "product_id"];
        (0, payloadValidation_1.validatePayload)(req.body, requiredFields);
        // Check if the user (customer) exists
        const user = await index_1.UserTable.findByPk(customer_id);
        if (!user) {
            throw new Error("User not found");
        }
        // Check if the product exists
        const product = await index_1.ProductTable.findByPk(product_id);
        if (!product) {
            throw new Error("Product not found");
        }
        // Check if the product is already in the user's cart
        const existingWishListItem = await index_1.WishlistTable.findOne({
            where: {
                customer_id,
                product_id,
            },
        });
        if (existingWishListItem) {
            throw new Error("Product already added to wish-list");
        }
        // Create the cart item
        const WishListItem = await index_1.WishlistTable.create({
            customer_id,
            product_id,
        });
        return {
            data: WishListItem,
            message: "Item is added to the wish list",
        };
    }
    catch (error) {
        console.error("Error in _createWishListItemService:", error);
        throw error;
    }
}
exports._createWishListItemService = _createWishListItemService;
async function _getWishListListService(req) {
    try {
        const { customer_id } = req.body;
        const requiredFields = ["customer_id"];
        (0, payloadValidation_1.validatePayload)(req.body, requiredFields);
        const customer = await index_1.UserTable.findByPk(customer_id);
        if (!customer) {
            throw new Error("User not found");
        }
        const wishList = await index_1.WishlistTable.findAll({
            where: { customer_id },
            include: [index_1.ProductTable],
        });
        return {
            data: wishList,
            message: "wish List retrieved successfully",
        };
    }
    catch (error) {
        console.error("Error in _getWishtListService:", error);
        throw error;
    }
}
exports._getWishListListService = _getWishListListService;
