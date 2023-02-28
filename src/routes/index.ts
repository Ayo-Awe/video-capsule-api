import express from "express";
import authRouter from "./auth.route";
import capsuleRouter from "./capsules.route";

const router = express.Router();

router.use("/capsules", capsuleRouter);
router.use("/auth", authRouter);

export default router;
