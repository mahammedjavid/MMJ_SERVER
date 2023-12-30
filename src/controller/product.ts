import { NextFunction, Response, Request, Router } from "express";
import passport from 'passport';
import {
  _createProductService,
  _getSingleProductService,
  _getProductListService,
  _updateProductService,
  _deactivateProductService,
  _createBulkProductsService
} from "../services/product";
import apiResponse from "../helper/apiResponce";
import multer from "multer";
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const router = Router();

router
  .route("/")
  .post(passport.authenticate('jwt', { session: false }), upload.array("product_image"), createProduct)
  .get(getProductList);

router
  .route("/:id")
  .get(getSingleProduct)
  .put(passport.authenticate('jwt', { session: false }), upload.array("product_image"), updateProduct)
  .delete(passport.authenticate('jwt', { session: false }), deactivateProduct);

// Bulk Upoload
router.post("/bulk-create", passport.authenticate('jwt', { session: false }), upload.single("productFile"), createBulkProducts);

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
      res.json(
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
  _getProductListService(res)
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
      res.json(
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
      res.json(
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
      res.json(
        apiResponse({
          data: "",
          status: false,
          message: err.message,
        })
      );
    });
}

//Deactivateproduct
async function deactivateProduct(req:Request, res:Response, next:NextFunction) {
  const productId = req.params.id;
  try {
    await _deactivateProductService(req,res);
    res.json(apiResponse({
      status: true,
      message: "Product deactivated successfully",
    }));
  } catch (err:any) {
    res.json(apiResponse({
      status: false,
      message: err.message,
    }));
  }
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
      res.json(
        apiResponse({
          data: "",
          status: false,
          message: err.message,
        })
      );
    });
}
export default router;
