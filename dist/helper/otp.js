"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetOtp = exports.sendOTPToUser = exports.generateOTP = void 0;
// Generate a random 6-digit OTP
function generateOTP() {
    const otpLength = 6;
    const min = Math.pow(10, otpLength - 1);
    const max = Math.pow(10, otpLength) - 1;
    const otp = Math.floor(min + Math.random() * (max - min + 1));
    return otp.toString();
}
exports.generateOTP = generateOTP;
async function sendOTPToUser(user, otp) {
    // Update the OTP column in the database
    user.otp = otp;
    await user.save();
    // Send OTP 
    // sendOTPViaSMS(user.mobile_number, otp);
}
exports.sendOTPToUser = sendOTPToUser;
async function resetOtp(user) {
    user.otp = null;
    await user.save();
}
exports.resetOtp = resetOtp;
