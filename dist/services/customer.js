"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._getAllUserListervice = exports._createCustomerService = exports.verifyOTPService = void 0;
const index_1 = require("../relation/index");
const otp_1 = require("../helper/otp");
const payloadValidation_1 = require("../helper/payloadValidation");
const jwtToken_1 = require("../helper/jwtToken");
async function _createCustomerService(req) {
    try {
        const { mobile_number, first_name, last_name } = req.body;
        if (!mobile_number) {
            throw new Error("Please provide mobile number!");
        }
        let existingUser = await index_1.UserTable.findOne({
            where: { mobile_number: mobile_number },
        });
        if (existingUser) {
            // User already exists, send OTP
            const otp = (0, otp_1.generateOTP)();
            // Send OTP
            (0, otp_1.sendOTPToUser)(existingUser, otp);
            return {
                data: existingUser,
                message: "OTP sent to existing user",
            };
        }
        else {
            // User doesn't exist, create a new user and send OTP
            const newUser = await index_1.UserTable.create(req.body);
            const otp = (0, otp_1.generateOTP)(); // Replace otp column
            // Send OTP
            (0, otp_1.sendOTPToUser)(newUser, otp);
            return {
                data: newUser,
                message: "New user created and OTP sent",
            };
        }
    }
    catch (error) {
        console.error("Error in _createCustomerService:", error);
        throw error;
    }
}
exports._createCustomerService = _createCustomerService;
async function verifyOTPService(req) {
    try {
        const { mobile_number, otp } = req.body;
        const requiredFields = ["mobile_number", "otp"];
        (0, payloadValidation_1.validatePayload)(req.body, requiredFields);
        const user = await index_1.UserTable.findOne({
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
        const accessToken = (0, jwtToken_1.generateAccessToken)(user);
        const refreshToken = (0, jwtToken_1.generateRefreshToken)(user);
        return {
            data: user,
            access_token: accessToken,
            refresh_token: refreshToken,
            message: "OTP Verified Successfully",
        };
    }
    catch (error) {
        console.error("Error in _verifyOTPService:", error);
        throw error;
    }
}
exports.verifyOTPService = verifyOTPService;
async function _getAllUserListervice() {
    try {
        const userData = await index_1.UserTable.findAll();
        return {
            data: userData,
            message: "All User data retrieved successfully",
        };
    }
    catch (error) {
        console.error("Error in _getAllUserListervice:", error);
        throw error;
    }
}
exports._getAllUserListervice = _getAllUserListervice;
