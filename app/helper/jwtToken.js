const jwt = require('jsonwebtoken');

const { ACCESSTOKENSECRET,REFRESHTOKENSECRET } = process.env;

// Function to generate an access token
function generateAccessToken(user) {

  const payload = {
    userId: user, 
    // Add any other data to the payload
  };

  return jwt.sign(payload, ACCESSTOKENSECRET, { expiresIn: "1d" });
}

// Function to generate a refresh token
function generateRefreshToken(user) {
  const payload = {
    user: user 
    // Add any other relevant data to the payload
  };
  return jwt.sign(payload, REFRESHTOKENSECRET, { expiresIn: "7d" });
}

function verifyAccessToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Access token missing." });
  }

  jwt.verify(token, ACCESSTOKENSECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid access token." });
    }
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds

    if (decoded.exp < currentTime) {
      return res.status(401).json({ message: "Access token has expired." });
    }

    // Attach the decoded user data to the request object
    req.user = decoded;

    next();
  });
}

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken
};
