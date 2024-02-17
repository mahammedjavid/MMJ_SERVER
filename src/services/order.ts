import { Request } from "express";
import { OrderTable, OrderItemTable, ProductTable, UserTable, AddressTable } from "../relation/index";
import { validatePayload } from "../helper/payloadValidation";
import { orderItem } from "../types/types";
import { reduceStock } from "../utils/reduceStock";

async function createOrderService(req: Request) {
  try {
    const { customer_id, address_id, order_items }: { customer_id: any; address_id: any; order_items: orderItem[] } = req.body;

    const requiredFields = ["customer_id", "address_id", "order_items"];
    validatePayload(req.body, requiredFields);

    let totalPrice = 0;
    for (const item of order_items) {
      const { product_id, quantity } = item;
      const product:any = await ProductTable.findByPk(product_id);
      if (!product) {
        throw new Error(`Product not found for ID: ${product_id}`);
      }
      if (quantity <= 0) {
        throw new Error(`Invalid quantity`);
      }
      if (quantity > product.stock) {
        throw new Error(`Sorry , Insuficiant quantity for this product`);
      }
      totalPrice += product.price * quantity;
    }

    // Create the order
    const order: any = await OrderTable.create({
      customer_id,
      address_id,
      total_price: totalPrice,
      status: "Pending",
    });

    // Create order items for the order
    const createdOrderItems = await Promise.all(order_items.map(async (item: orderItem) => {
      const { product_id, quantity } = item;
      try {
        const orderItem: any = await OrderItemTable.create({
          product_id,
          quantity,
          order_id: order.order_id,
        });
        // Reduce stock for the product
        await reduceStock(product_id, quantity);
        return orderItem.order_item_id;
      } catch (error) {
        throw error;
      }
    }));

    return {
      data: { order, orderItem : createdOrderItems },
      message: "Order created successfully"
    };

  } catch (error) {
    console.error("Error in createOrderService:", error);
    throw error;
  }
}
async function _getOrderListService(req: Request) {
  try {
    const { customer_id } = req.params;

    if(!customer_id){
        throw new Error(`Customer id not found`);
    }
    const orders = await OrderTable.findAll({
      where: { customer_id },
      include: [
        {
          model: OrderItemTable,
          include: [
            { model: ProductTable }
          ]
        },
        UserTable,
        AddressTable
      ]    });

    return {
      data: orders,
      message: "Order list retrieved successfully",
    };
  } catch (error) {
    console.error("Error in _getOrderListService:", error);
    throw error;
  }
}

async function _updateOrderStatusService(req:Request) {
  try {
    const { order_id , status } = req.body

    const requiredFields = ["order_id", "status"];

    validatePayload(req.body, requiredFields);

    const order = await OrderTable.findByPk(order_id);

    if (!order) {
      throw new Error("Order not found");
    }

    await order.update({ status });

    return {
      data : order,
      message : "Order status updated successfully"

    };
  } catch (error) {
    console.error("Error in updateOrderStatusService:", error);
    throw error;
  }
}

export { _getOrderListService , createOrderService , _updateOrderStatusService };
