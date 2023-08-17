const {
  UserTable,
  CartTable,
  ProductTable,
} = require("../../../../models/index");
const { validatePayload } = require("../../../helper/payloadValidation");
async function _createCartItemService(req) {
  try {
    const { customer_id, product_id, quantity } = req.body;

    // Check if required fields are provided
    const requiredFields = ["customer_id", "product_id", "quantity"];
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

    // Create the cart item
      const cartItem = await CartTable.create({
        customer_id,
        product_id,
        quantity,
      });

    return {
      data: cartItem, // TODO replace with cartItem
      message: "Item is added to the cart",
    };
  } catch (error) {
    console.error("Error in _createCartItemService:", error);
    throw error;
  }
}
async function _getCartListService() {
    try {
      const cartList = await CartTable.findAll();
      return {
        data: cartList,
        message: "Cart list retrieved successfully",
      };
    } catch (error) {
      console.error("Error in _getCartListService:", error);
      throw error;
    }
  }

module.exports = {
  _createCartItemService,
  _getCartListService,
};
