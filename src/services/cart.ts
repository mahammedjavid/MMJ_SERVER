import { Request } from "express";
import { UserTable, CartTable, ProductTable } from "../relation/index";
import { validatePayload } from "../helper/payloadValidation";
import { reduceStock } from "../utils/reduceStock";
import { checkCartParameter, isValidSize } from "../utils/func";

async function _createCartItemService(req: Request) {
  try {
    const {
      customer_id,
      product_id,
      size,
      status
    }: { customer_id: string; product_id: string; status: string; size: string } = req.body;

    const requiredFields = ["customer_id", "product_id", "status", "size"];
    validatePayload(req.body, requiredFields);

    const user = await UserTable.findByPk(customer_id);
    if (!user) {
      throw new Error("User not found");
    }

    const product: any = await ProductTable.findByPk(product_id);
    if (!product) {
      throw new Error("Product not found");
    }

    if (!product.size.split(',').includes(size)) {
      throw new Error("Size not available");
    }

    if (!isValidSize(size)) {
      throw new Error("Invalid size");
    }

    if(!checkCartParameter(status)){
      throw new Error("Status Parameter is invalid");      
    }

    const existingCartItem: any = await CartTable.findOne({
      where: {
        customer_id,
        product_id,
        size,
      },
    });

    let cartItem;

    if (status === 'add') {
      if (existingCartItem) {
        existingCartItem.quantity += 1;
        if (existingCartItem.quantity > product.stock) {
          throw new Error("Insufficient stock");
        }
        cartItem = await existingCartItem.save();
      } else {
        if (product.stock < 1) {
          throw new Error("Insufficient stock");
        }
        cartItem = await CartTable.create({
          customer_id,
          product_id,
          quantity: 1,
          size : size.toLocaleUpperCase(),
        });
      }
    } else if (status === 'remove') {
      if (!existingCartItem) {
        return {
          message: "Item not found",
        };
      }
      existingCartItem.quantity -= 1;
      if (existingCartItem.quantity == 0) {
        await CartTable.destroy({
          where: {
            customer_id,
            product_id,
            size,
          },
        });
        return {
          message: "Item removed from the cart",
        };
      }
      cartItem = await existingCartItem.save();
    }

    return {
      data: cartItem,
      message: "Item " + (status === 'add' ? 'added to' : 'removed from') + " the cart",
    };
  } catch (error) {
    console.error("Error in _createCartItemService:", error);
    throw error;
  }
}



async function _getCartListService(req: Request) {
  try {
    const { customer_id } = req.params;
    if (!customer_id) {
      throw new Error("Customer ID is required")
    }
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

async function _removeProductFromCartService(req: Request) {
  try {
    const { customer_id, product_id, size } = req.params;
    if (!customer_id || !product_id || !size) {
      throw new Error("Product ID ,Customer ID ,size is required")
    }
    if (!isValidSize(size)) {
      throw new Error("Invalid size");
    }
    const removedItem = await CartTable.destroy({
      where: {
        customer_id,
        product_id,
        size : size.toLocaleUpperCase()
      },
    });

    if (!removedItem) {
      throw new Error("User or product with this size not found")
    }
    return {
      data: removedItem,
      message: "This item is removed from cart",
    };
  } catch (error) {
    console.error("Error in _removeProductFromCartService:", error);
    throw error;
  }
}
async function _removeAllProductFromCartService(req: Request) {
  try {
    const { customer_id } = req.params;
    if (!customer_id) {
      throw new Error("Customer ID is required")
    }
    const removedItem = await CartTable.destroy({
      where: {
        customer_id,
      },
    });

    if (!removedItem) {
      throw new Error("User has no item in cart")
    }
    return {
      data: removedItem,
      message: "All items are removed from cart",
    };
  } catch (error) {
    console.error("Error in _removeAllProductFromCartService:", error);
    throw error;
  }
}
export { _createCartItemService, _getCartListService, _removeProductFromCartService , _removeAllProductFromCartService };
