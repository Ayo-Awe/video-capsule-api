import express, { Express } from "express";
import * as dotenv from "dotenv";
import apiRouter from "./routes/index";
import { errorHandler, errorLogger } from "./middlewares/errorMiddleware";
import connectDB from "./config/database.config";
import agenda from "./config/agenda.config";
import { registerJobs } from "./job";
import morgan from "morgan";

dotenv.config();

// Initialise new express app
const app: Express = express();

// Middleware
app.use(express.json());
app.use(morgan("tiny"));
app.use("/api", apiRouter);
app.use(errorLogger);
app.use(errorHandler);

// Start express server
const port = process.env.PORT || 8080;

// IIFE to start express application
(async () => {
  await connectDB();
  await agenda.start();
  registerJobs(agenda);
  app.listen(port, () => console.log(`Listening on port ${port}`));
})();
