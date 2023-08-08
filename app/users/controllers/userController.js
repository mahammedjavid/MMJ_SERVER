const router = require("express").Router();
const apiResponse = require("../../helper/apiResponce");
const { _createCustomerService } = require("../services/userService");
const { verifyOTPService } = require("../services/userService");

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

    res.json({
      status: "OK",
      message: "OTP verified successfully.",
      data: { user: user },
    });
  } catch (error) {
    console.error("Error in verifyOTP:", error);
    res.status(500).json({
      status: "Error",
      message: "An error occurred while verifying OTP.",
    });
  }
}
