import { S3Client } from "@aws-sdk/client-s3";
import multerS3 from "multer-s3";
import multer from "multer";
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
});

export default upload;
