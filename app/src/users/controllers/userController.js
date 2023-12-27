const router = require("express").Router();
const passport = require('passport')
const apiResponse = require("../../../helper/apiResponce");
const {
  _createCustomerService,
  verifyOTPService,
  _getAllUserListervice
} = require("../services/userService");

router.route("/").get(passport.authenticate('jwt',{session:false}),getAllUserList)
router.post("/login", createCustomer);
router.post("/verify-otp", verifyOTP);
module.exports = router;

function createCustomer(req, res, next) {
  _createCustomerService(req)
    .then((result) =>
      res.json(
        apiResponse({
          data: result.data,
          status: "OK",
          message: result.message,
        })
      )
    )
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

async function verifyOTP(req, res, next) {
  verifyOTPService(req)
    .then((result) =>
      res.json(
        apiResponse({
          data: result.data,
          status: "OK",
          message: result.message,
          access_token: result.access_token,
          refresh_token: result.refresh_token
        })
      )
    )

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
function getAllUserList(req, res, next) {
  _getAllUserListervice(req)
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
