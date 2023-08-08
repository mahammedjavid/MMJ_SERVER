// Generate a random 6-digit OTP
function generateOTP() {
    const otpLength = 6;
    const otp = Math.floor(100000 + Math.random() * 900000);
    return otp.toString();
}
async function sendOTPToUser(user, otp) {
    // Update the OTP column in the database
    user.otp = otp;
    await user.save();
  
    // Send OTP 
    // sendOTPViaSMS(user.mobile_number, otp);
  }
module.exports = {generateOTP,sendOTPToUser};
  