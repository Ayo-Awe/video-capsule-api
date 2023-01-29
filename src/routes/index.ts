import express from "express";
import capsuleRouter from "./capsules.route";

const router = express.Router();

router.use("/capsules", capsuleRouter);

export default router;
