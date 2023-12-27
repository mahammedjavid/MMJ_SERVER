const router = require("express").Router();
const passport = require('passport')
const { _getCartListService,_createCartItemService } = require("../services/cartService");
const apiResponse = require("../../../helper/apiResponce");
router.route('/').get(getAllCartItems).post(passport.authenticate('jwt',{session:false}),addToCart);
function addToCart(req, res, next) {
  _createCartItemService(req)
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
function getAllCartItems(req, res, next) {
    _getCartListService(req)
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
