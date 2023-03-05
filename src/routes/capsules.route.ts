import express from "express";
import upload from "../config/multer.config";
import controller from "../controllers/capsule.controller";
import { auth } from "../middlewares/authMiddleware";
import { handleAsync } from "../utils/helpers";

const router = express.Router();

router.post("/", upload.single("video"), handleAsync(controller.createHandler));
router.get("/:id/url", handleAsync(controller.getCapsuleUrl));
router.get("/", auth, handleAsync(controller.getAllCapsules));
router.get("/:id", handleAsync(controller.getOneCapsuleHandler));
router.post("/:id/confirm", handleAsync(controller.confirmSchedule));
router.delete("/:id", auth, handleAsync(controller.deleteHandler));
export default router;
