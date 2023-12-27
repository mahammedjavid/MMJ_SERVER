// Service
const { UserTable } = require('../../../../models/index')
const Sequelize = require('sequelize');
const { generateOTP, sendOTPToUser, resetOtp } = require("../../../helper/otp");
const { validatePayload } = require('../../../helper/payloadValidation');
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../../../helper/jwtToken");

async function _createCustomerService(req) {
  try {
    const { mobile_number, first_name, last_name } = req.body;

    if (!mobile_number) {
      throw new Error("Please provide mobile number!");
    }

    let existingUser = await UserTable.findOne({
      where: { mobile_number: mobile_number },
    });

    if (existingUser) {
      // User already exists, send OTP
      const otp = generateOTP()
      // Send OTP
      sendOTPToUser(existingUser, otp);

      return {
        data: existingUser,
        message: "OTP sent to existing user",
      };
    } else {
      // User doesn't exist, create new user and send OTP
      const newUser = await UserTable.create(req.body);
      const otp = generateOTP(); // Replace otp column
      // Send OTP
      sendOTPToUser(newUser, otp);

      return {
        data: newUser,
        message: "New user created and OTP sent",
      };
    }
  } catch (error) {
    console.error("Error in _createCustomerService:", error);
    throw error;
  }
}

async function verifyOTPService(req) {
  try {
    const { mobile_number, otp } = req.body;
    const requiredFields = ["mobile_number", "otp"]
    validatePayload(req.body, requiredFields)
    const user = await UserTable.findOne({
      where: { mobile_number: mobile_number, otp: otp },
    });
    if (!user) {
      throw new Error("Invalid mobile number or OTP.");
    }
    // Reset the OTP after successful verification
    // user.otp = null;
    // await user.save();

    // reset the otp column after 30 seconds
    // setTimeout(async () => {
    //   resetOtp(user)
    // }, 30000); // 30 seconds in milliseconds

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    return {
      data: user,
      access_token: accessToken,
      refresh_token: refreshToken,
      message: "OTP Verified Successfully",
    };
  } catch (error) {
    console.error("Error in _verifyOTPService:", error);
    throw error;
  }
}

async function _getAllUserListervice(req) {
  try {
    const userData = await UserTable.findAll();
    return {
      data: userData,
      message: "All User data retrieved successfully",
    };
  } catch (error) {
    console.error("Error in _getAllUserListervice:", error);
    throw error;
  }
}

module.exports = {
  verifyOTPService,
  _createCustomerService,
  _getAllUserListervice
};