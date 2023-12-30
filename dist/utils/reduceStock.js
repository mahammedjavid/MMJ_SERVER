"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reduceStock = void 0;
async function reduceStock(product, quantity) {
    try {
        product.stock -= quantity;
        // Save the updated product
        await product.save();
    }
    catch (error) {
        console.error("Error in reduceStock:", error);
        throw error;
    }
}
exports.reduceStock = reduceStock;
