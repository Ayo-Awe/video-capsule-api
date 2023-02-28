import multerS3 from "multer-s3";
import multer from "multer";
import * as dotenv from "dotenv";
import s3Client from "./aws.config";
dotenv.config();

const bucket = process.env.DO_BUCKET_NAME as string;

// Configure multer with s3 bucket
const upload = multer({
  storage: multerS3({
    bucket,
    s3: s3Client,
  }),
});

export default upload;
