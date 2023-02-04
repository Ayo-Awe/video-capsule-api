import { S3Client } from "@aws-sdk/client-s3";
import multerS3 from "multer-s3";
import multer, { Multer } from "multer";
import { Request, Express } from "express";
import * as dotenv from "dotenv";
dotenv.config();

const region = process.env.AWS_REGION;
const bucket = process.env.AWS_BUCKET_NAME as string;

// Instantiate new S3Client
const s3 = new S3Client({ region: region });

// Configure multer with s3 bucket
const upload = multer({
  storage: multerS3({
    bucket,
    s3,
  }),
  fileFilter: fileLimitter,
});

// Multer middleware to limit file size to 40Mb
function fileLimitter(
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) {
  if (file.size <= 40 * 1024 * 1024) {
    cb(null, true);
  } else {
    cb(new Error("File size must be less than 40MB"));
  }
}

export default upload;
