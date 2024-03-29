import { Request, Response } from "express";
import { ProductAttributes, UserAttributes } from "../types/types";
import {
  ProductTable,
  CategoryTable,
  BulkUploadTable,
  UserTable,
  CartTable,
  WishlistTable,
} from "../relation/index";
import { uploadToS3 } from "../helper/aws.s3-upload";
import { convertCsvToListOfObject } from "../helper/csvToJson";
import { convertObjectListToCsv } from "../helper/JsonTocsv";
import { getTheUserInfoFromJwt } from "../helper/getTheUserInfoFromAccessToken";
import { validatePayload } from "../helper/payloadValidation";
import generateNextSequentialID from "../utils/generateSKU";
import { isValidSize, validSizes } from "../utils/func";
import { Op } from "sequelize";

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
      product_image
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

    // !For multiple image upload
    // let uploadedImageUrls: any = [];
    // req.files.map(async (file: any) => {
    // let image = await uploadToS3(file.buffer, file.originalname,file.mimetype) //s3 link
    // uploadedImageUrls.push(image);
    // });
    let lastProduct: any = await ProductTable.findOne({
      order: [["SKU", "DESC"]],
    });
    const SKU = generateNextSequentialID(lastProduct?.SKU || "MMJ00000");
    const modifiedProduct = {
      product_images: Array.isArray(product_image) ? product_image?.join(",") : product_image,
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
    console.error("Error in _createProductService:", error);
    throw error;
  }
}

// Product list service
async function _getProductListService(req: Request, res: Response) {
  try {

    const categoryId = req.query.category_id

    const searchTerm = req.query.query

    const page = req.query.page ? parseInt(req.query.page as string) : null;

    const pageSize = req.query.page_size ? parseInt(req.query.page_size as string) : null;

    const type = req.query.type

    const sortBy = req.query.sort_by;


    let where_clause: { isActive: boolean;[key: string]: any } = {
      isActive: true,
    };

    if (categoryId) {
      where_clause['category_id'] = categoryId;
    }

    if (searchTerm) {
      where_clause['product_title'] = { [Op.iLike]: `%${searchTerm}%` }
    }


    if (type) {
      let product_section: any = {
        column: '',
        value: ''
      }
      switch (type) {
        case 'discount':
          product_section.column = 'offer_price'
          product_section.value = {
            [Op.and]: [
              { [Op.not]: null },
              { [Op.ne]: 0 },
            ],
          }
          break;

        default:
          product_section.column = ''
          product_section.value = ''
          break;
      }
      if (product_section.column && product_section.value) where_clause[product_section.column] = product_section.value;
    }

    let options: any = {
      where: where_clause,
      include: [CategoryTable],
    };

    if (sortBy) {
      switch (sortBy) {
        case 'latest':
          options.order = [['updatedAt', 'DESC']];
          break;
        case 'oldest':
          options.order = [['updatedAt', 'ASC']];
          break;
        default:
          delete options.order
          break;
      }
    }

    if (page && pageSize) {
      const offset = (page - 1) * pageSize;
      options.offset = offset;
      options.limit = pageSize;
    }

    const totalCount = await ProductTable.count({
      where: where_clause,
    });

    const productList : any = await ProductTable.findAll(options);

    const user = getTheUserInfoFromJwt(req, 'optional')?.userDetails;
    const userId = user?.customer_id;
    let userProductPromise:any = []
    if (userId) {
      userProductPromise = productList.map(async (product:any) => {
        const productPlain = { ...product.dataValues };
        const in_cart = await CartTable.findOne({ where: { customer_id: userId, product_id: product.product_id } }) ? true : false;
        const in_wishlist =  await WishlistTable.findOne({ where: { customer_id: userId, product_id: product.product_id } }) ? true : false;
        productPlain.in_cart =  in_cart
        productPlain.in_wishlist = in_wishlist;
        return productPlain;
      });
    }

    const resolvedUserProducts = await Promise.all(userProductPromise)
    console.log('productListPlain',resolvedUserProducts)
    return {
      data: resolvedUserProducts.length ? resolvedUserProducts : productList,
      totalCount,
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

    const user = getTheUserInfoFromJwt(req, 'optional')?.userDetails;
    const userId = user?.customer_id;

    let userProduct = null ;
    
    if (userId) {
      userProduct = {...product.dataValues}
        const in_cart = await CartTable.findOne({ where: { customer_id: userId, product_id: productId } }) ? true : false;
        const in_wishlist =  await WishlistTable.findOne({ where: { customer_id: userId, product_id: productId } }) ? true : false;
        userProduct.in_cart =  in_cart
        userProduct.in_wishlist = in_wishlist;
    }
    return {
      data: userProduct ? userProduct : product,
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
    product.product_images = updatedData.product_image && Array.isArray(updatedData.product_image) ? updatedData.product_image.join(',') : updatedData.product_image ? updatedData.product_image : product.product_images;
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
async function _activateDeactivateProductService(req: Request, res: Response) {

  const {
    product_id,
    status,
  } = req.body;

  const requiredFields = [
    "product_id",
    "status"
  ];
  validatePayload(req.body, requiredFields);

  if (status != 'true' && status != 'false') throw new Error("Invalid Input for status")

  try {
    const product: any = await ProductTable.findByPk(product_id);
    if (!product) {
      throw new Error("Product not found");
    }

    product.isActive = status;
    await product.save();

    return {
      message: "Product" + " " + (status === 'true' ? "Activated" : "Deactivated") + " " + "Successfully"
    };
  } catch (error) {
    console.error("Error in _activateDeactivateProductService:", error);
    throw error;
  }
}

// !Bulk Upload Service

async function _createBulkProductsService(req: any, res: Response) {
  try {
    const user: any = getTheUserInfoFromJwt(req, 'required')?.userDetails;

    console.log("user is", user)
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
      const existingProduct = allProduct.find((existing: any) => existing.SKU === product.SKU);

      if (isNaN(Number(product.price)) || Number(product.price) < 0) {
        product.status = false;
        product.message = "Price is not valid";
        modifiedProductsPromises.push(Promise.resolve(product));
        continue; // Move to the next iteration of the loop
      }

      if (product.size) {
        const sizeList = product.size.split(",");
        if (sizeList.every((s: any) => isValidSize(s))) {
          product.status = true;
          product.size = sizeList.map((s: any) => s.toUpperCase()).join(",");
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
        console.log("222222", product.product_title)
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

    const s3Link = "s3link"; // await uploadToS3(file.fileBuffer, file.originalname, file.fileType);
    const bulk = {
      fileName: req?.file?.originalname || 'file',
      fileLink: s3Link,
      message: "Uploaded successfully",
      customer_id: user.customer_id,
    };

    const bulkUploadResponse = await BulkUploadTable.create(bulk); //comment this line for testing
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
  _activateDeactivateProductService,
  _createBulkProductsService,
};
