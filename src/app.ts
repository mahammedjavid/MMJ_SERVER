import express from "express";
import helmet from "helmet";
import * as winston from "winston";
import { configureMiddleware } from "./middleware/configureMiddleWare";
import * as dotenv from "dotenv";
dotenv.config();

const app: express.Application = express();

configureMiddleware(app);
const port: number = parseInt(process.env.PORT || "3000", 10);

// Use helmet for basic security headers
app.use(helmet());

// Create a Winston logger
const logger: winston.Logger = winston.createLogger({
  transports: [new winston.transports.Console()],
});

logger.info("Application starting...");

app.get("/", (req: express.Request, res: express.Response) => {
  res.send("Welcome to MMJ Server!");
});

import appRoutes from "./routes/index";
app.use("/api", appRoutes);

// Error handling middleware
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    logger.error(err.stack);
    res.status(500).send("Something went wrong!");
  }
);

// Graceful shutdown on receiving SIGTERM signal
process.on("SIGTERM", () => {
  logger.info("Received SIGTERM. Shutting down gracefully...");
  // Perform cleanup here if needed
  process.exit(0);
});

// Start the server and listen on the specified port
app.listen(port, () => logger.info(`Listening on port ${port}`));
