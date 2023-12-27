const router = require("express").Router();
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const { _getcategoryListService , _createCategoryService} = require("../services/categoryService");
const apiResponse = require("../../../helper/apiResponce");
router.route('/').get(getAllCategory).post(upload.single("category_image"), createCategory);
function getAllCategory(req, res, next) {
    _getcategoryListService(req)
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
  function createCategory(req, res, next) {
    _createCategoryService(req)
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
module.exports = router;
