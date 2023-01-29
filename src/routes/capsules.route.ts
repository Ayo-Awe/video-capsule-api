import express from "express";
import upload from "../config/multer.config";

const router = express.Router();

router.post("/", upload.single("video"));

export default router;
