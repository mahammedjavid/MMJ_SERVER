import { NextFunction, Response, Request, Router } from "express";
import passport from 'passport';
import {
  _createProductService,
  _getSingleProductService,
  _getProductListService,
  _updateProductService,
  _activateDeactivateProductService,
  _createBulkProductsService
} from "../services/product";
import apiResponse from "../helper/apiResponce";
import multer from "multer";
import { verifyAccessToken } from "../helper/jwtToken";
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const router = Router();

router
  .route("/")
  .post(verifyAccessToken, upload.array("product_image"), createProduct) //verifyAccessToken
  .get(getProductList);

router.route('/manage-product').post(verifyAccessToken, activateDeactivateProduct)

router
  .route("/:id")
  .get(getSingleProduct)
  .put(verifyAccessToken, upload.array("product_image"), updateProduct);

// Bulk Upoload
router.post("/bulk-create", verifyAccessToken, upload.single("productFile"), createBulkProducts);

function createProduct(req:Request, res:Response, next:NextFunction) {
  _createProductService(req,res)
    .then((result:any) => {
      console.log(result);
      res.json(
        apiResponse({
          data: result.data,
          status: true,
          message: result.message,
        })
      );
    })
    .catch((err:any) => {
      res.status(500).json(
        apiResponse({
          data: "",
          status: false,
          message: err.message,
        })
      );
    });
}

// Product list api
function getProductList(req:Request, res:Response, next:NextFunction) {
  _getProductListService(req,res)
    .then((result:any) => {
      res.json(
        apiResponse({
          data: result.data,
          totalCount : result.totalCount,
          status: true,
          message: result.message,
        })
      );
    })
    .catch((err:any) => {
      res.status(500).json(
        apiResponse({
          data: "",
          status: false,
          message: err.message,
        })
      );
    });
}
// Single product
function getSingleProduct(req:Request, res:Response, next:NextFunction) {
  _getSingleProductService(req,res)
    .then((result:any) => {
      res.json(
        apiResponse({
          data: result.data,
          status: true,
          message: result.message,
        })
      );
    })
    .catch((err:any) => {
      res.status(500).json(
        apiResponse({
          data: "",
          status: false,
          message: err.message,
        })
      );
    });
}
// Update product api
function updateProduct(req:Request, res:Response, next:NextFunction) {
  _updateProductService(req,res)
    .then((result:any) => {
      res.json(
        apiResponse({
          data: result.data,
          status: true,
          message: result.message,
        })
      );
    })
    .catch((err:any) => {
      res.status(500).json(
        apiResponse({
          data: "",
          status: false,
          message: err.message,
        })
      );
    });
}

//Deactivateproduct
function activateDeactivateProduct(req:Request, res:Response, next:NextFunction) {
  _activateDeactivateProductService(req,res)
    .then((result:any) => {
      res.json(
        apiResponse({
          data: "",
          status: true,
          message: result.message,
        })
      );
    })
    .catch((err:any) => {
      res.status(500).json(
        apiResponse({
          data: "",
          status: false,
          message: err.message,
        })
      );
    });
}
// ! Bulk Upload 
// ? Create Product
function createBulkProducts(req:Request, res:Response, next:NextFunction) {
  _createBulkProductsService(req,res)
    .then((result:any) => {
      res.json(
        apiResponse({
          data: result.data,
          status: true,
          message: result.message,
          downloadLink: result.downloadLink
        })
      );
    })
    .catch((err:any) => {
      res.status(500).json(
        apiResponse({
          data: "",
          status: false,
          message: err.message,
        })
      );
    });
}
export default router;
