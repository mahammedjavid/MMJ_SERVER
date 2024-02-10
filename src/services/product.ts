import { Request, Response } from "express";
import { ProductAttributes, UserAttributes } from "../types/types";
import {
  ProductTable,
  CategoryTable,
  BulkUploadTable,
  UserTable,
} from "../relation/index";
import { uploadToS3 } from "../helper/aws.s3-upload";
import { convertCsvToListOfObject } from "../helper/csvToJson";
import { convertObjectListToCsv } from "../helper/JsonTocsv";
import { getTheUserInfoFromJwt } from "../helper/getTheUserInfoFromAccessToken";
import { validatePayload } from "../helper/payloadValidation";
import generateNextSequentialID from "../utils/generateSKU";
import { isValidSize, validSizes } from "../utils/func";

async function _createProductService(req: any, res: Response) {
  try {
    const {
      product_description,
      price,
      stock,
      product_title,
      category_id,
      product_other_info,
      size,
    } = req.body;

    const requiredFields = [
      "product_description",
      "price",
      "stock",
      "product_title",
      "category_id",
      "size",
    ];
    validatePayload(req.body, requiredFields);

    if (
      (Array.isArray(size) && !size.every((s: any) => isValidSize(s))) ||
      (!Array.isArray(size) && !isValidSize(size))
    ) {
      throw new Error(`Size must be in this ${validSizes.join(", ")}`);
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
    let uploadedImageUrls: any = [];
    // !For multiple image upload
    req.files.map(async (file: any) => {
      // let image = await uploadToS3(file.buffer, file.originalname,file.mimetype) //s3 link
      let image = file.originalname; // for testing purposes
      uploadedImageUrls.push(image);
    });
    let lastProduct: any = await ProductTable.findOne({
      order: [["SKU", "DESC"]],
    });
    const SKU = generateNextSequentialID(lastProduct?.SKU || "MMJ00000");
    const modifiedProduct = {
      product_images: uploadedImageUrls.join(","),
      product_title,
      SKU,
      product_description,
      price,
      stock,
      category_id,
      product_other_info,
      size: Array.isArray(size)
        ? size.map((s) => s.toUpperCase())?.join(",")
        : size.toUpperCase(),
    };
    let existingProduct = await ProductTable.findOne({
      where: { SKU },
    });
    if (existingProduct) {
      throw new Error("Product Already Exists");
    }
    let categoryExist = await CategoryTable.findOne({
      where: { category_id },
    });
    if (!categoryExist) {
      throw new Error("Category not found");
    }
    const product = await ProductTable.create(modifiedProduct);
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
async function _getProductListService(res: Response) {
  try {
    let where_clause = {
      isActive: true,
    };
    // Fetch the list of products from the database
    const productList = await ProductTable.findAll({
      where: where_clause,
      include: [CategoryTable],
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
async function _getSingleProductService(req: Request, res: Response) {
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
async function _updateProductService(req: Request, res: Response) {
  const productId = req.params.id;
  const updatedData = req.body;

  try {
    // Fetch the product by its ID from the database
    const product: any = await ProductTable.findByPk(productId);
    if (!product) {
      throw new Error("Product not found");
    }
    let updatedsize = updatedData.size || product.size;
    if (
      (Array.isArray(updatedsize) &&
        !updatedsize.every((s: any) => isValidSize(s))) ||
      (!Array.isArray(updatedsize) && !isValidSize(updatedsize))
    ) {
      throw new Error(`Size must be in this ${validSizes.join(", ")}`);
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
    product.product_other_info =
      updatedData.product_other_info || product.product_other_info;
    product.price = updatedData.price || product.price;
    product.stock = updatedData.stock || product.stock;
    product.category_id = updatedData.category_id || product.category_id;
    product.product_title = updatedData.product_title || product.product_title;
    product.product_description =
      updatedData.product_description || product.product_description;
    product.size = Array.isArray(updatedsize)
      ? updatedsize.map((s) => s.toUpperCase())?.join(",")
      : updatedsize.toUpperCase();

    let categoryExist = await CategoryTable.findOne({
      where: { category_id: product.category_id },
    });
    if (!categoryExist) {
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
async function _deactivateProductService(req: Request, res: Response) {
  const productId = req.params.id;
  try {
    const product: any = await ProductTable.findByPk(productId);
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

async function _createBulkProductsService(req: any, res: Response) {
  try {
    const user: any = getTheUserInfoFromJwt(req)?.userDetails;
    const allProduct = await ProductTable.findAll();

    // new bulk upload flow
    const data = await convertCsvToListOfObject(req.file);

    let lastProduct: any = await ProductTable.findOne({
      order: [["SKU", "DESC"]],
    });
    console.log("last Product ------------------", lastProduct);

    const modifiedProductsPromises = [];

    for (let index = 0; index < data.length; index++) {
      const product = data[index];
      console.log("1111111111111111",product.product_title)
      const existingProduct = allProduct.find((existing:any) => existing.SKU === product.SKU);
    
      if (isNaN(Number(product.price)) || Number(product.price) < 0) {
        product.status = false;
        product.message = "Price is not valid";
        modifiedProductsPromises.push(Promise.resolve(product));
        continue; // Move to the next iteration of the loop
      }
    
      if (product.size) {
        const sizeList = product.size.split(",");
        if (sizeList.every((s:any) => isValidSize(s))) {
          product.status = true;
          product.size = sizeList.map((s:any) => s.toUpperCase()).join(",");
        } else {
          product.status = false;
          product.message = `Size must be in this ${validSizes.join(", ")}`;
          modifiedProductsPromises.push(Promise.resolve(product));
          continue; // Move to the next iteration of the loop
        }
      } else {
        product.status = false;
        product.message = `Size must be in this ${validSizes.join(", ")}`;
        modifiedProductsPromises.push(Promise.resolve(product));
        continue; // Move to the next iteration of the loop
      }
    
      if (existingProduct) {
        product.status = false;
        product.message = "Product already exists";
        modifiedProductsPromises.push(Promise.resolve(product));
        continue; // Move to the next iteration of the loop
      }

      if (product.offer_price !== '') {
        if (!Number(product.offer_price) || Number(product.offer_price) <= 0) {
          product.status = false;
          product.message = "Offer price must be greater than zero";
          modifiedProductsPromises.push(Promise.resolve(product));
          continue; // Move to the next iteration of the loop
        }
      } else {
        product.offer_price = 0;
      }
    
      if (!product.category_id) {
        product.status = false;
        product.message = "Category ID is required";
        modifiedProductsPromises.push(Promise.resolve(product));
        continue; // Move to the next iteration of the loop
      } else {
        const category = await CategoryTable.findByPk(product.category_id);
        console.log("222222",product.product_title)
        if (!category) {

          product.status = false;
          product.message = "Category does not exist";
          modifiedProductsPromises.push(Promise.resolve(product));
          continue; // Move to the next iteration of the loop
        }
      }

    
      product.status = true;
      product.message = "Success";
      modifiedProductsPromises.push(Promise.resolve(product));
    }

    const modifiedProducts = await Promise.all(modifiedProductsPromises);
    console.log(modifiedProducts);

    const content = await convertObjectListToCsv(modifiedProducts);

    const downloadLink = `data:text/csv;charset=utf-8,${encodeURIComponent(
      content
    )}`;

    const s3Link = "s3link"; // await uploadToS3(file.fileBuffer, file.originalname, file.fileType);
    const bulk = {
      fileName: req.file.originalname,
      fileLink: s3Link,
      message: "Uploaded successfully",
      customer_id: user.customer_id,
    };

    const bulkUploadResponse = await BulkUploadTable.create(bulk);
    const successfulProducts = modifiedProducts.filter(
      (product) => product.status && product.message == "Success"
    );
    // SKU for Sucess products
    successfulProducts.forEach((p, index) => {
      p.SKU = generateNextSequentialID(
        index === 0 && !lastProduct?.SKU
          ? "MMJ00000"
          : index === 0
          ? lastProduct?.SKU
          : data[index - 1].SKU
      );
    });
    let productCreateResponse: any = [];
    if (successfulProducts.length) {
      productCreateResponse = await ProductTable.bulkCreate(successfulProducts);
    }

    return {
      data: productCreateResponse,
      downloadLink: downloadLink,
      message: "Bulk uploaded successfully",
    };
  } catch (error) {
    console.error("Error in _createBulkProductsService:", error);
    throw error;
  }
}

export {
  _createProductService,
  _getProductListService,
  _getSingleProductService,
  _updateProductService,
  _deactivateProductService,
  _createBulkProductsService,
};
