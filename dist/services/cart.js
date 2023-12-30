"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._getCartListService = exports._createCartItemService = void 0;
const index_1 = require("../relation/index");
const payloadValidation_1 = require("../helper/payloadValidation");
const reduceStock_1 = require("../utils/reduceStock");
async function _createCartItemService(req) {
    try {
        const { customer_id, product_id, quantity, } = req.body;
        const requiredFields = ["customer_id", "product_id", "quantity"];
        (0, payloadValidation_1.validatePayload)(req.body, requiredFields);
        const user = await index_1.UserTable.findByPk(customer_id);
        if (!user) {
            throw new Error("User not found");
        }
        const product = await index_1.ProductTable.findByPk(product_id);
        if (!product) {
            throw new Error("Product not found");
        }
        if (product.stock < quantity) {
            throw new Error("Insufficient quantity in stock");
        }
        const existingCartItem = await index_1.CartTable.findOne({
            where: {
                customer_id,
                product_id,
            },
        });
        let cartItem;
        if (existingCartItem) {
            // If the same product is already in the cart, increase the quantity
            existingCartItem.quantity += Number(quantity);
            cartItem = await existingCartItem.save();
        }
        else {
            // If the product is not in the cart, create a new cart item
            cartItem = await index_1.CartTable.create({
                customer_id,
                product_id,
                quantity,
            });
        }
        // Reduce the stock quantity in the product table
        await (0, reduceStock_1.reduceStock)(product, Number(quantity));
        return {
            data: cartItem,
            message: "Item is added to the cart",
        };
    }
    catch (error) {
        console.error("Error in _createCartItemService:", error);
        throw error;
    }
}
exports._createCartItemService = _createCartItemService;
async function _getCartListService(req) {
    try {
        const { customer_id } = req.body;
        const requiredFields = ["customer_id"];
        (0, payloadValidation_1.validatePayload)(req.body, requiredFields);
        const customer = await index_1.UserTable.findByPk(customer_id);
        if (!customer) {
            throw new Error("User not found");
        }
        const cartList = await index_1.CartTable.findAll({
            where: { customer_id },
            include: [index_1.ProductTable],
        });
        return {
            data: cartList,
            message: "Cart list retrieved successfully",
        };
    }
    catch (error) {
        console.error("Error in _getCartListService:", error);
        throw error;
    }
}
exports._getCartListService = _getCartListService;
