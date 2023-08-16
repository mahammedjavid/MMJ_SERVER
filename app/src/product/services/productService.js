// Service
const { ProductTable } = require("../../../../models/index");
const { uploadToS3 } = require("../../../helper/aws.s3-upload");
const {
  parseCSVFromBuffer,
  createCSVWithStatus,
} = require("../../../helper/cscHelper");
const fs = require("fs");
async function _createProductService(req) {
  try {
    const { SKU, description, price, stock } = req.body;
    const requiredFields = ["SKU", "description", "price", "stock"];
    let missingFields = [];

    if (!SKU || !description || !price || !stock) {
      requiredFields.forEach((field) => {
        if (!req.body[field]) {
          missingFields.push(field);
        }
      });

      const errorMessage = `${missingFields.join(", ")} ${
        missingFields.length > 1 ? "are" : "is"
      } required`;
      throw new Error(errorMessage);
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
    let uploadedImageUrls = [];
    // !For multiple image upload
    req.files.map(async (file) => {
      // let image = await uploadToS3(file.buffer, file.originalname,file.mimetype) //s3 link
      let image = file.originalname; // for testing purposes
      uploadedImageUrls.push(image);
    });
    const modifiledProduct = {
      product_images: uploadedImageUrls,
      SKU,
      description,
      price,
      stock,
    };
    // !need to connect db
    let existingProduct = await ProductTable.findOne({
      where: { SKU },
    });
    if (existingProduct) {
      throw new Error("Product Already Exists");
    }
    const product = await ProductTable.create(modifiledProduct);
    return {
      data: product, //TODO
      message: "Product Created successfully",
    };
  } catch (error) {
    console.error("Error in _createCustomerService:", error);
    throw error;
  }
}

// Product list service
async function _getProductListService() {
  try {
    // Fetch the list of products from the database
    const productList = await ProductTable.findAll({
      where: {
        isActive: true, // Fetch only active products
      },
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
async function _getSingleProductService(productId) {
  try {
    // Fetch a single product by its ID from the database
    const product = await ProductTable.findOne({
      id: productId,
      isActive: true,
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
    if (updatedData.product_images) {
      const updatedImageUrls = await Promise.all(
        updatedData.product_images.map(async (image) => {
          // Update S3 links if needed
          const updatedImage = await uploadToS3(
            image.buffer,
            image.originalname,
            image.mimetype
          );
          return updatedImage;
        })
      );
      product.product_images = updatedImageUrls;
    }
    // Update other fields if needed
    product.SKU = updatedData.SKU || product.SKU;
    product.description = updatedData.description || product.description;
    product.price = updatedData.price || product.price;
    product.stock = updatedData.stock || product.stock;

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

async function _createBulkProductsService(fileBuffer) {
  try {
    const parsingResults = {
      success: [],
      errors: [],
    };

    await new Promise((resolve, reject) => {
      parseCSVFromBuffer(
        fileBuffer,
        async (data) => {
          const price = parseFloat(data.price);
          if (isNaN(price) || price <= 0) {
            parsingResults.errors.push({
              row: data,
              message: "Invalid or missing price",
            });
          } else {
            // TODO: Check for existing product with the same SKU
            let existingProduct = await ProductTable.findOne({
              where: { SKU: data.SKU },
            });
            if (existingProduct) {
              parsingResults.errors.push({
                row: data,
                message: "Product with SKU already exists",
              });
              return; // Skip further processing for this row
            }

            // !if image uploaded in the binary
            // const imageColumns = ["image1", "image2", "image3", "image4", "image5"];
            // const imageUrls = [];
            // console.log(data)
            // for (const imageColumn of imageColumns) {
            //   const imageUrl = data[imageColumn];
            //   if (imageUrl) {
            //     const imageBuffer = fs.readFileSync(imageUrl);
            //     const s3Link = await uploadToS3(imageBuffer, imageUrl, "image/jpeg"); // Modify mimetype accordingly
            //     imageUrls.push(s3Link);
            //   }
            // }
            // !if image uploaded in url
            const imageUrls = data["images"]
              ?.split(",")
              ?.map((url) => url.trim()); // Split and trim URLs

            const productData = {
              SKU: data.SKU,
              description: data.description,
              price,
              stock: parseInt(data.stock),
              images: imageUrls,
            };
            parsingResults.success.push(productData);
          }
        },
        async () => {
          resolve(); // Resolve the promise when parsing is complete
          const product = await ProductTable.bulkCreate(parsingResults.success);
        },
        (error) => {
          parsingResults.errors.push(error);
          reject(error); // Reject the promise on error
        }
      );
    });

    const newCsvContent = createCSVWithStatus(parsingResults);
    const log = `data:text/csv;charset=utf-8,${encodeURIComponent(
      newCsvContent
    )}`;

    return {
      data: parsingResults.success,
      errors: parsingResults.errors,
      downloadLink: log,
      message: `Bulk product creation finished`,
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
