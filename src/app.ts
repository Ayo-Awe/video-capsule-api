import express, { Express } from "express";
import * as dotenv from "dotenv";
import apiRouter from "./routes/index";

dotenv.config();

// Initialise new express app
const app: Express = express();

// Middleware
app.use(express.json());
app.use("/api", apiRouter);

// Start express server
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}`));
