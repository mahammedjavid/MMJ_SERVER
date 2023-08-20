const router = require("express").Router();
const { _getcategoryListService} = require("../services/categoryService");
const apiResponse = require("../../../helper/apiResponce");
router.get("/", getAllCategory);
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
module.exports = router;
