const router = require("express").Router();
const {
  _createProductService,
  _getSingleProductService,
  _getProductListService,
  _updateProductService,
  _deactivateProductService,
  _createBulkProductsService
} = require("../services/productService");
const apiResponse = require("../../../helper/apiResponce");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/create", upload.array("product_image"), createProduct);
router.get("/list", getProductList);
router.get("/:id", getSingleProduct);
router.put("/:id/update", updateProduct);
router.delete("/:id/deactivate", deactivateProduct);

// Bulk Upoload
router.post("/bulk-create", upload.single("productFile"), createBulkProducts);

function createProduct(req, res, next) {
  _createProductService(req)
    .then((result) => {
      console.log(result);
      res.json(
        apiResponse({
          data: result.data,
          status: true,
          message: result.message,
        })
      );
    })
    .catch((err) => {
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
function getProductList(req, res, next) {
  _getProductListService()
    .then((result) => {
      res.json(
        apiResponse({
          data: result.data,
          status: true,
          message: result.message,
        })
      );
    })
    .catch((err) => {
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
function getSingleProduct(req, res, next) {
  const productId = req.params.id;
  _getSingleProductService(productId)
    .then((result) => {
      res.json(
        apiResponse({
          data: result.data,
          status: true,
          message: result.message,
        })
      );
    })
    .catch((err) => {
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
function updateProduct(req, res, next) {
  const productId = req.params.id;
  _updateProductService(productId, req.body)
    .then((result) => {
      res.json(
        apiResponse({
          data: result.data,
          status: true,
          message: result.message,
        })
      );
    })
    .catch((err) => {
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
async function deactivateProduct(req, res, next) {
  const productId = req.params.id;
  try {
    await _deactivateProductService(productId);
    res.json(apiResponse({
      status: true,
      message: "Product deactivated successfully",
    }));
  } catch (err) {
    res.json(apiResponse({
      status: false,
      message: err.message,
    }));
  }
}
// ! Bulk Upload 
// ? Create Product
async function createBulkProducts(req, res, next) {
  try {
    _getProductListService().then(async (allProduct)=>{
      const result = await _createBulkProductsService(req.file.buffer, allProduct.data)
      res.json(
        apiResponse({
          data: result.data,
          status: true,
          message: result.message,
          downloadLink : result.downloadLink
        }),
      );
    })
  } catch (err) {
    res.json(
      apiResponse({
        data: '',
        status: false,
        message: err.message || "An error occurred",
      })
    );
  }
}
module.exports = router;
