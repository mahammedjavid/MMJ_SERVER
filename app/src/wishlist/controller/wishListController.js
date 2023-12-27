const router = require("express").Router();
const passport = require('passport')
const { _getWishListListService,_createWishListItemService } = require("../services/wishListService");
const apiResponse = require("../../../helper/apiResponce");
router.route('/').get(getAllWishListItems).post(passport.authenticate('jwt',{session:false}),addToWishList);
function addToWishList(req, res, next) {
    _createWishListItemService(req)
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
function getAllWishListItems(req, res, next) {
    _getWishListListService(req)
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
