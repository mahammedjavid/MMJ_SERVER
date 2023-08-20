const { ProductTable } = require('../../../../models/index')
async function _getcategoryListService() {
    try {
        const products = await ProductTable.findAll();
        const uniqueCategories = [...new Set(products.flatMap((product) => product.category))];
        return {
            data: uniqueCategories,
            message: "Category list retrieved successfully",
          };
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
}
module.exports = {
    _getcategoryListService
}