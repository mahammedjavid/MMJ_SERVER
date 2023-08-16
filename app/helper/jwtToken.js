const jwt = require('jsonwebtoken');

const { ACCESSTOKENEXPIRY, REFRESHTOKENEXPIRY,ACCESSTOKENSECRET,REFRESHTOKENSECRET } = process.env;

// Function to generate an access token
function generateAccessToken(user) {
  const payload = {
    userId: user.id, 
    // Add any other data to the payload
  };
  return jwt.sign(payload, ACCESSTOKENSECRET, { expiresIn: ACCESSTOKENEXPIRY });
}

// Function to generate a refresh token
function generateRefreshToken(user) {
  const payload = {
    userId: user.id, // Use the appropriate user identifier
    // Add any other relevant data to the payload
  };
  return jwt.sign(payload, REFRESHTOKENSECRET, { expiresIn: REFRESHTOKENEXPIRY });
}

module.exports = {
  generateAccessToken,
  generateRefreshToken,
};
