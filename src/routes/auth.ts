import express from "express";
import authController from "../controllers/auth.controller";
import { handleAsync } from "../utils/helpers";
const authRouter = express.Router();

authRouter.post("/login", handleAsync(authController.loginHandler));
authRouter.post("/signup", handleAsync(authController.signupHandler));
authRouter.post("/login/verify", handleAsync(authController.verifyLogin));
authRouter.post("/signup/verify", handleAsync(authController.verifySignup));

export default authRouter;
