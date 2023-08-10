const router = require("express").Router();
const { _createProductService } = require("../services/productService");
const apiResponse  = require("../../../helper/apiResponce");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/create", upload.array("product_image"), createProduct);

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
      res.json( apiResponse({
        data: '',
        status: false,
        message: err.message,
      }));
    });
}

module.exports = router;
