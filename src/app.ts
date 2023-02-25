import express, { ErrorRequestHandler, Express } from "express";
import * as dotenv from "dotenv";
import apiRouter from "./routes/index";
import { errorHandler, errorLogger } from "./middlewares/errorMiddleware";
import connectDB from "./config/database.config";
import agenda from "./config/agenda.config";
import capsuleService from "./services/capsule.service";
import mongoose from "mongoose";
import { registerJobs } from "./job";

dotenv.config();

// Initialise new express app
const app: Express = express();

// Middleware
app.use(express.json());
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
