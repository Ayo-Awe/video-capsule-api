import express, { ErrorRequestHandler, Express } from "express";
import * as dotenv from "dotenv";
import apiRouter from "./routes/index";
import errorHandler from "./middlewares/errorMiddleware";

dotenv.config();

// Initialise new express app
const app: Express = express();

// Middleware
app.use(express.json());
app.use("/api", apiRouter);
app.use(errorHandler);

// Start express server
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}`));
