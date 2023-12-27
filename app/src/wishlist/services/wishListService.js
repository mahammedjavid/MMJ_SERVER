const {
    UserTable,
    WishlistTable,
    ProductTable,
} = require("../../../../models/index");
const { validatePayload } = require("../../../helper/payloadValidation");
async function _createWishListItemService(req) {
    try {
        const { customer_id, product_id } = req.body;

        // Check if required fields are provided
        const requiredFields = ["customer_id", "product_id"];
        validatePayload(req.body, requiredFields);

        // Check if the user (customer) exists
        const user = await UserTable.findByPk(customer_id);
        if (!user) {
            throw new Error("User not found");
        }

        // Check if the product exists
        const product = await ProductTable.findByPk(product_id);
        if (!product) {
            throw new Error("Product not found");
        }

        // Check if the product is already in the user's cart
        const existingWishListItem = await WishlistTable.findOne({
            where: {
                customer_id,
                product_id,
            },
        });

        if (existingWishListItem) {
            throw new Error("Product already added to wish-list");
        }

        // Create the cart item
        const WishListItem = await WishlistTable.create({
            customer_id,
            product_id,
        });

        return {
            data: WishListItem,
            message: "Item is added to the wish list",
        };
    } catch (error) {
        console.error("Error in _createWishListItemService:", error);
        throw error;
    }
}
async function _getWishListListService(req) {
    try {
        const { customer_id } = req.body
        const requiredFields = ["customer_id"]
        validatePayload(req.body, requiredFields);
        const customer = await UserTable.findByPk(customer_id)
        if (!customer) {
            throw new Error("User not found");
        }
        const wishList = await WishlistTable.findAll({
            where: { customer_id },
            include: [ProductTable]
        });
        return {
            data: wishList,
            message: "wish List retrieved successfully",
        };
    } catch (error) {
        console.error("Error in _getWishtListService:", error);
        throw error;
    }
}

module.exports = {
    _createWishListItemService,
    _getWishListListService,
};
