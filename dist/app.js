"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const winston = __importStar(require("winston"));
const configureMiddleWare_1 = require("./middleware/configureMiddleWare");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const app = (0, express_1.default)();
(0, configureMiddleWare_1.configureMiddleware)(app);
const port = parseInt(process.env.PORT || "3000", 10);
// Use helmet for basic security headers
app.use((0, helmet_1.default)());
// Create a Winston logger
const logger = winston.createLogger({
    transports: [new winston.transports.Console()],
});
logger.info("Application starting...");
app.get("/", (req, res) => {
    res.send("Welcome to MMJ Server!");
});
const index_1 = __importDefault(require("./routes/index"));
app.use("/api", index_1.default);
// Error handling middleware
app.use((err, req, res, next) => {
    logger.error(err.stack);
    res.status(500).send("Something went wrong!");
});
// Graceful shutdown on receiving SIGTERM signal
process.on("SIGTERM", () => {
    logger.info("Received SIGTERM. Shutting down gracefully...");
    // Perform cleanup here if needed
    process.exit(0);
});
// Start the server and listen on the specified port
app.listen(port, () => logger.info(`Listening on port ${port}`));
