async function reduceStock(product: any, quantity: number): Promise<void> {
  try {
    product.stock -= quantity;
    // Save the updated product
    await product.save();
  } catch (error) {
    console.error("Error in reduceStock:", error);
    throw error;
  }
}
export { reduceStock };
