const { CategoryTable } = require("../../../../models/index");
const { validatePayload } = require("../../../helper/payloadValidation");
async function _getcategoryListService() {
    try {
        const category = await CategoryTable.findAll();
        return {
            data: category,
            message: "Category list retrieved successfully",
        };
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
}

async function _createCategoryService(req) {
    try {
      const { category_name } = req.body;
      const requiredFields = ["category_name"];
      validatePayload(req.body,requiredFields);
      let existingCategory = await CategoryTable.findOne({
        where: { category_name },
      });
      console.log(existingCategory)
      if (existingCategory) {
        throw new Error("Category Already Exists");
      }    
  
      // !For single image upload
    //   let uploadedImage =  uploadToS3(req.file.buffer, req.file.originalname, req.file.mimetype);
      let uploadedImage = req.file.originalname //for testing purposes
    //   Create the category in the database
      const newCategory = await CategoryTable.create({
        category_image: uploadedImage,
        category_name,
      });
  return {
        data: newCategory,
        message: "Category Created successfully",
      };
    } catch (error) {
      console.error("Error in _createCustomerService:", error);
      throw error;
    }
  }
module.exports = {
    _getcategoryListService,
    _createCategoryService
}