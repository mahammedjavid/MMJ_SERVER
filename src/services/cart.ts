import { Request } from "express";
import { UserTable, CartTable, ProductTable } from "../relation/index";
import { validatePayload } from "../helper/payloadValidation";
import { reduceStock } from "../utils/reduceStock";

async function _createCartItemService(req: Request) {
  try {
    const {
      customer_id,
      product_id,
      quantity,
    }: { customer_id: number; product_id: number; quantity: number } = req.body;

    const requiredFields = ["customer_id", "product_id", "quantity"];
    validatePayload(req.body, requiredFields);

    const user = await UserTable.findByPk(customer_id);
    if (!user) {
      throw new Error("User not found");
    }

    const product: any = await ProductTable.findByPk(product_id);
    if (!product) {
      throw new Error("Product not found");
    }

    if(product.stock < quantity){
      throw new Error("Insufficient quantity in stock");
    }

    const existingCartItem: any = await CartTable.findOne({
      where: {
        customer_id,
        product_id,
      },
    });

    let  cartItem
    if (existingCartItem) {
      // If the same product is already in the cart, increase the quantity
      existingCartItem.quantity += Number(quantity);
      cartItem = await existingCartItem.save();
    } else {
      // If the product is not in the cart, create a new cart item
      cartItem = await CartTable.create({
        customer_id,
        product_id,
        quantity,
      });
    }
    // Reduce the stock quantity in the product table
    await reduceStock(product, Number(quantity));
    return {
      data: cartItem,
      message: "Item is added to the cart",
    };
  } catch (error) {
    console.error("Error in _createCartItemService:", error);
    throw error;
  }
}

async function _getCartListService(req: Request) {
  try {
    const { customer_id }: { customer_id: number } = req.body;
    const requiredFields = ["customer_id"];
    validatePayload(req.body, requiredFields);
    const customer = await UserTable.findByPk(customer_id);
    if (!customer) {
      throw new Error("User not found");
    }
    const cartList = await CartTable.findAll({
      where: { customer_id },
      include: [ProductTable],
    });
    return {
      data: cartList,
      message: "Cart list retrieved successfully",
    };
  } catch (error) {
    console.error("Error in _getCartListService:", error);
    throw error;
  }
}

export { _createCartItemService, _getCartListService };
