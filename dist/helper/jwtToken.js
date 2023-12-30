"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAccessToken = exports.generateRefreshToken = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const { ACCESSTOKENSECRET, REFRESHTOKENSECRET } = process.env;
// Function to generate an access token
function generateAccessToken(user) {
    const payload = {
        userDetails: user,
    };
    return jsonwebtoken_1.default.sign(payload, ACCESSTOKENSECRET, { expiresIn: "1d" });
}
exports.generateAccessToken = generateAccessToken;
// Function to generate a refresh token
function generateRefreshToken(user) {
    const payload = {
        user: user,
    };
    return jsonwebtoken_1.default.sign(payload, REFRESHTOKENSECRET, { expiresIn: "7d" });
}
exports.generateRefreshToken = generateRefreshToken;
function verifyAccessToken(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: "Access token missing." });
    }
    jsonwebtoken_1.default.verify(token, ACCESSTOKENSECRET, (err, decoded) => {
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
exports.verifyAccessToken = verifyAccessToken;
