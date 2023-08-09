const router = require("express").Router();
const apiResponse = require("../../../helper/apiResponce");
const { _createCustomerService,verifyOTPService } = require("../services/userService");

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
    .catch((err) => next(err));
}

async function verifyOTP(req, res, next) {

  try {
    const { mobile_number, otp } = req.body;

    if (!mobile_number || !otp) {
      return res.status(400).json({
        status: "Error",
        message: "Mobile number and OTP are required.",
      });
    }
    const user = await verifyOTPService(mobile_number, otp);
    res.json(
      apiResponse({
        data: { message: "OTP verified successfully." },
        status: "OK",
      })
    );
  } catch (error) {
    if (error.message === "Invalid mobile number or OTP.") {
      res.status(400).json(
        apiResponse({
          data: { message: "Invalid mobile number or OTP." },
          status: "ERROR",
        })
      );
    } else {
      res.status(400).json(
        apiResponse({
          data: { message: "OTP has expired." },
          status: "ERROR",
        })
      );
    }
  }
}
