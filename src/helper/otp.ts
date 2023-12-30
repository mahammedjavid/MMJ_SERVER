import { UserTable } from '../relation/index';

// Generate a random 6-digit OTP
function generateOTP(): string {
  const otpLength = 6;
  const min = Math.pow(10, otpLength - 1);
  const max = Math.pow(10, otpLength) - 1;
  const otp = Math.floor(min + Math.random() * (max - min + 1));
  return otp.toString();
}


async function sendOTPToUser(user: any, otp: string) {
  // Update the OTP column in the database
  user.otp = otp;
  await user.save();

  // Send OTP 
  // sendOTPViaSMS(user.mobile_number, otp);
}

async function resetOtp(user: any) {
  user.otp = null;
  await user.save();
}

export { generateOTP, sendOTPToUser, resetOtp };
