import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const { ACCESSTOKENSECRET, REFRESHTOKENSECRET } = process.env;

// Function to generate an access token
function generateAccessToken(user: any): string {
  const payload = {
    userDetails: user,
  };

  return jwt.sign(payload, ACCESSTOKENSECRET as string, { expiresIn: "1d" });
}

// Function to generate a refresh token
function generateRefreshToken(user: any): string {
  const payload = {
    user: user,
  };
  return jwt.sign(payload, REFRESHTOKENSECRET as string, { expiresIn: "7d" });
}

function verifyAccessToken(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Access token missing." });
  }

  jwt.verify(token, ACCESSTOKENSECRET as string, (err: any, decoded: any) => {
    if (err) {
      return res.status(403).json({ message: "Invalid access token." });
    }
    const currentTime = Math.floor(Date.now() / 1000);

    if (decoded.exp < currentTime) {
      return res.status(401).json({ message: "Access token has expired." });
    }
    req.user = decoded;

    next();
  });
}

export { generateAccessToken, generateRefreshToken, verifyAccessToken };
