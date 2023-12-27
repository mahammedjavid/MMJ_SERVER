// Service
const { ProductTable, CategoryTable, BulkUpload } = require("../../../../models/index");
const { uploadToS3 } = require("../../../helper/aws.s3-upload");
const { convertCsvToListOfObject } = require('../../../helper/csvToJson')
const { convertObjectListToCsv } = require('../../../helper/JsonTocsv')
const { getTheUserInfoFromJwt } = require('../../../helper/getTheUserInfoFromAccessToken')
const { validatePayload } = require("../../../helper/payloadValidation");
const { Op } = require("sequelize");
const fs = require("fs");
async function _createProductService(req) {
  try {
    const { SKU, description, price, stock, product_title, category_id } = req.body;

    const requiredFields = ["SKU", "description", "price", "stock", "product_title", "category_id"];
    validatePayload(req.body, requiredFields);

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
    let uploadedImageUrls = [];
    // !For multiple image upload
    req.files.map(async (file) => {
      // let image = await uploadToS3(file.buffer, file.originalname,file.mimetype) //s3 link
      let image = file.originalname; // for testing purposes
      uploadedImageUrls.push(image);
    });
    const productImagesString = JSON.stringify(uploadedImageUrls);
    const modifiledProduct = {
      product_images: productImagesString,
      product_title,
      SKU,
      description,
      price,
      stock,
      category_id
    };
    let existingProduct = await ProductTable.findOne({
      where: { SKU },
    });
    if (existingProduct) {
      throw new Error("Product Already Exists");
    }
    let cateoryExist = await CategoryTable.findOne({
      where: { category_id },
    });
    if (!cateoryExist) {
      throw new Error("Category not found");
    }
    const product = await ProductTable.create(modifiledProduct);
    return {
      data: product,
      message: "Product Created successfully",
    };
  } catch (error) {
    console.error("Error in _createCustomerService:", error);
    throw error;
  }
}

// Product list service
async function _getProductListService(req) {
  try {
    let where_clause = {
      isActive: true
    }
    // Fetch the list of products from the database
    const productList = await ProductTable.findAll({
      where: where_clause,
      include: [CategoryTable]
    });
    return {
      data: productList,
      message: "Product list retrieved successfully",
    };
  } catch (error) {
    console.error("Error in _getProductListService:", error);
    throw error;
  }
}
// Single product api
async function _getSingleProductService(req) {
  try {
    const productId = req.params.id;
    const product = await ProductTable.findOne({
      where: {
        product_id: productId,
        isActive: true,
      },
    });
    if (!product) {
      throw new Error("Product not found");
    }
    return {
      data: product,
      message: "Product retrieved successfully",
    };
  } catch (error) {
    console.error("Error in _getSingleProductService:", error);
    throw error;
  }
}
// Update product
async function _updateProductService(productId, updatedData) {
  try {
    // Fetch the product by its ID from the database
    const product = await ProductTable.findByPk(productId);
    if (!product) {
      throw new Error("Product not found");
    }

    // Update the S3 links and other data based on updatedData
    // if (updatedData.product_images) {
    //   const updatedImageUrls = await Promise.all(
    //     updatedData.product_images.map(async (image) => {
    //       const updatedImage = await uploadToS3(
    //         image.buffer,
    //         image.originalname,
    //         image.mimetype
    //       );
    //       return updatedImage;
    //     })
    //   );
    //   product.product_images = updatedImageUrls;
    // }
    // Update other fields if needed
    product.SKU = updatedData.SKU || product.SKU;
    product.description = updatedData.description || product.description;
    product.price = updatedData.price || product.price;
    product.stock = updatedData.stock || product.stock;
    product.category_id = updatedData.category_id || product.category_id;
    product.product_title = updatedData.product_title || product.product_title;

    let cateoryExist = await CategoryTable.findOne({
      where: { category_id  : product.category_id},
    });
    if (!cateoryExist) {
      throw new Error("Category not found");
    }
    // Save the changes to the database
    await product.save();
    return {
      data: product,
      message: "Product updated successfully",
    };
  } catch (error) {
    console.error("Error in _updateProductService:", error);
    throw error;
  }
}

// Deactivate product service
async function _deactivateProductService(productId) {
  try {
    const product = await ProductTable.findByPk(productId);
    if (!product) {
      throw new Error("Product not found");
    }

    product.isActive = false; // Deactivate the product
    await product.save();

    return;
  } catch (error) {
    console.error("Error in _deactivateProductService:", error);
    throw error;
  }
}

// !Bulk Upload Service

async function _createBulkProductsService(req, allProduct, responce) {
  try {
    const user = getTheUserInfoFromJwt(req)?.userDetails
    console.log("user",user)
    // new bulk upload flow

    const data = convertCsvToListOfObject(req.file);
    const res = await data;

    console.log("data is", res);

    const modifiedProducts = res.map((product) => {
      const existingProduct = allProduct.find((existing) => existing.SKU === product.SKU);

      // Initialize a 'status' key in each product object
      product.status = true;
      product.message = 'Success';

      // Check if the price is a valid number and not negative
      if (isNaN(Number(product.price)) || Number(product.price) < 0) {
        product.status = false;
        product.message = 'Price is not valid';
      }

      if (existingProduct) {
        // SKU exists in the database
        product.status = false;
        product.message = 'Product already exists';
      }

      return product;
    });

    const content = await convertObjectListToCsv(modifiedProducts);

    const downloadLink = `data:text/csv;charset=utf-8,${encodeURIComponent(content)}`;
    console.log(downloadLink);

    const s3Link = 's3link'; // await uploadToS3(file.fileBuffer, file.originalname, file.fileType);
    const bulk = {
      fileName: req.file.originalname,
      fileLink: s3Link,
      message: 'Uploaded successfully',
      customer_id : user.customer_id
    };

    const bulkUploadResponse = await BulkUpload.create(bulk);
    const successfulProducts = modifiedProducts.filter((product) => product.status && product.message == 'Success');
    let productCreateResponse = ''
    if (successfulProducts.length){
      productCreateResponse = await ProductTable.bulkCreate(successfulProducts)
    } ;

    return {
      data: productCreateResponse,
      downloadLink: downloadLink,
      message: 'Bulk uploaded successfully',
    };
  } catch (error) {
    console.error("Error in _createBulkProductsService:", error);
    throw error;
  }
}


module.exports = {
  _createProductService,
  _getProductListService,
  _getSingleProductService,
  _updateProductService,
  _deactivateProductService,
  _createBulkProductsService,
};
