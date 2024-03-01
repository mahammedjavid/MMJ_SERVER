import { ProductTable } from "../relation/index";

async function reduceStock(product_id: any, quantity: number): Promise<void> {
  try {
    const product:any = await ProductTable.findByPk(product_id);
    if (!product) {
      throw new Error(`Product not found`);
    }
    product.stock -= quantity;
    await product.save();
  } catch (error) {
    console.error("Error in reduceStock:", error);
    throw error;
  }
}

export { reduceStock };
