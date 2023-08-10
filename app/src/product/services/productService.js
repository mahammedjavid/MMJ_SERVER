// Service
const { ProductTable } = require("../../../../models/index");
const { uploadToS3 } = require("../../../helper/aws.s3-upload");

async function _createProductService(req) {
  try {
    const { SKU, description, price, stock } = req.body;
    let erros = []
    let allKeys = [SKU, description, price, stock]
    allKeys.map((res)=>{
        if(!res){
            erros.push(res)
        }
    })
    if (!SKU || !description || !price || !stock) {
      throw new Error(erros.toString()+ 'is required');
    }

    // !For single image upload
    // let uploadedImage =  uploadToS3(req.file.buffer, req.file.originalname, req.file.mimetype);
    // Create the product in the database
    // const newProduct = await ProductTable.create({
    //   product_image: uploadedImage,
    //   SKU,
    //   description,
    //   price,
    //   stock,
    // });
    let uploadedImageUrls = []
    // !For multiple image upload
    req.files.map((file)=>{
        // let image = await uploadToS3(req.file.buffer, req.file.originalname,req.file.mimetype) //s3 link
        let image = file.originalname // for testing purposes
        uploadedImageUrls.push(image)
    })
    const modifiledProduct = {
        product_images: uploadedImageUrls,
        SKU,
        description,
        price,
        stock,
      };
      console.log("Modified Product",modifiledProduct)
      const product = await ProductTable.create(modifiledProduct);
      console.log("Product",product)
    return {
      data: product,
      message: "Product Created successfully",
    };
  } catch (error) {
    console.error("Error in _createCustomerService:", error);
    throw error;
  }
}


module.exports = {
    _createProductService,
};
