import express, { Express } from "express";
import * as dotenv from "dotenv";

dotenv.config();

// Initialise new express app
const app: Express = express();

// Middleware
app.use(express.json());

// Listen for requests
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}`));
