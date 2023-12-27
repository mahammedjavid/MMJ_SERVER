const {
  UserTable,
  CartTable,
  ProductTable,
  CategoryTable,
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

    // Check if the product is already in the user's cart
    const existingCartItem = await CartTable.findOne({
      where: {
        customer_id,
        product_id
      },
    });

    if (existingCartItem) {
      throw new Error("Product already added to cart");
    }

    // Check if the product has enough quantity
    if (product.quantity < quantity) {
      throw new Error("Insufficient quantity in stock");
    }

    // Create the cart item
    const cartItem = await CartTable.create({
      customer_id,
      product_id,
      quantity,
    });

    return {
      data: cartItem,
      message: "Item is added to the cart",
    };
  } catch (error) {
    console.error("Error in _createCartItemService:", error);
    throw error;
  }
}
async function _getCartListService(req) {
  try {
    const { customer_id } = req.body
    const requiredFields = ["customer_id"]
    validatePayload(req.body, requiredFields);
    const customer = await UserTable.findByPk(customer_id)
    if (!customer) {
      throw new Error("User not found");
    }
    const cartList = await CartTable.findAll({
      where: { customer_id },
      include: [ProductTable]
    });
    return {
      data: cartList, //req.user will get the user object cause we added the authorization middleware
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
