import multerS3 from "multer-s3";
import multer from "multer";
import * as dotenv from "dotenv";
import s3Client from "./aws.config";
import { BadRequest } from "../errors/httpErrors";
dotenv.config();

const bucket = process.env.DO_BUCKET_NAME as string;

// Configure multer with s3 bucket
const upload = multer({
  storage: multerS3({
    bucket,
    s3: s3Client,
  }),
  fileFilter: (req, file, cb) => {
    const acceptedFileTypes = ["video/mp4", "video/x-matroska"];

    if (!acceptedFileTypes.includes(file.mimetype))
      return cb(new BadRequest("Invalid video type"));

    cb(null, true);
  },
});

export default upload;
