import { UserTable } from "../relation/index";
import { generateOTP, sendOTPToUser, resetOtp } from "../helper/otp";
import { validatePayload } from "../helper/payloadValidation";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../helper/jwtToken";
import { Request } from "express";

async function _createCustomerService(req: Request) {
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
      const otp = generateOTP();
      // Send OTP
      sendOTPToUser(existingUser, otp);

      return {
        data: existingUser,
        message: "OTP sent to existing user",
      };
    } else {
      // User doesn't exist, create a new user and send OTP
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

async function verifyOTPService(req: Request) {
  try {
    const { mobile_number, otp } = req.body;
    const requiredFields = ["mobile_number", "otp"];
    validatePayload(req.body, requiredFields);
    const user = await UserTable.findOne({
      where: { mobile_number: mobile_number, otp: otp },
    });
    if (!user) {
      throw new Error("Invalid mobile number or OTP.");
    }
    // Reset the OTP after successful verification
    // user.otp = null;
    // await user.save();

    // Reset the otp column after 30 seconds
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

async function _resendOtpService(req: Request) {
  try {
    const { mobile_number } = req.body;

    if (!mobile_number) {
      throw new Error("mobile number not found!");
    }

    let existingUser = await UserTable.findOne({
      where: { mobile_number: mobile_number },
    });

    if (!existingUser) {
      throw new Error("user not found for this mobile number");
    }

      const otp = generateOTP();
      sendOTPToUser(existingUser, otp);

      return {
        data: existingUser,
        message: "OTP sent succussfully",
      };
  } catch (error) {
    console.error("Error in _resendOtpService:", error);
    throw error;
  }
}


async function _updateCustomerInfoService(req: Request) {
  try {
    const userID = req.params.id;

    console.log("-----------",userID)

    const { mobile_number, first_name, last_name, dob, email } = req.body;

    if (!userID) {
      throw new Error("User ID not Found!");
    }

    let existingUser:any  = await UserTable.findOne({
      where: { customer_id: userID },
    });

    if (!existingUser) {
      throw new Error("User not found with provided id.");
    }

    // Update user information
    existingUser.first_name = first_name || existingUser.first_name;
    existingUser.last_name = last_name || existingUser.last_name;
    existingUser.dob = dob || existingUser.dob;
    existingUser.email = email || existingUser.email;

    await existingUser.save();

    return {
      data: existingUser,
      message: "User information updated successfully",
    };
  } catch (error) {
    console.error("Error in _updateCustomerInfoService:", error);
    throw error;
  }
}


async function _getAllUserListervice() {
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

async function _generateNewRefreshTokenService(req: Request) {
  try {
    const user = req.user
    const accessToken = generateAccessToken(user);
    return {
      data: accessToken,
      message: "Access token is generated succusfully",
    };
  } catch (error) {
    console.error("Error in _generateNewRefreshTokenService:", error);
    throw error;
  }
}
async function _logOutService(req: Request) {
  try {
    return {
      data: '',
      message: "Logout Successfull",
    };
  } catch (error) {
    console.error("Error in _logOutService:", error);
    throw error;
  }
}


export { verifyOTPService, _createCustomerService, _getAllUserListervice , _updateCustomerInfoService , _generateNewRefreshTokenService , _resendOtpService , _logOutService };
