// Service
const { UserTable } = require('../../../../models/index')
const Sequelize = require('sequelize');
const { generateOTP, sendOTPToUser, resetOtp } = require("../../../helper/otp");

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
        data: { user: existingUser },
        message: "OTP sent to existing user",
      };
    } else {
      // User doesn't exist, create new user and send OTP
      const newUser = await UserTable.create(req.body);
      const otp = generateOTP(); // Replace otp column
      // Send OTP
      sendOTPToUser(newUser, otp);

      return {
        data: { user: newUser },
        message: "New user created and OTP sent",
      };
    }
  } catch (error) {
    console.error("Error in _createCustomerService:", error);
    throw error;
  }
}

async function verifyOTPService(mobile_number, otp) {
  const user = await UserTable.findOne({
    where: { mobile_number: mobile_number, otp: otp },
  });

  if (!user) {
    throw new Error("Invalid mobile number or OTP.");
  }

  // Reset the OTP after successful verification
  user.otp = null;
  await user.save();

  // Set a timeout to reset the otp column after 30 seconds
  setTimeout(async () => {
    resetOtp(user)
  }, 30000); // 30 seconds in milliseconds

  return user;
}

module.exports = {
  verifyOTPService,
};


module.exports = {
  _createCustomerService,
  verifyOTPService
};