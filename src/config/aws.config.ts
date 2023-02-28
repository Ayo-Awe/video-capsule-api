import { S3Client } from "@aws-sdk/client-s3";
import * as dotenv from "dotenv";
dotenv.config();

// Instantiate new S3Client
const s3Client = new S3Client({
  endpoint: "https://nyc3.digitaloceanspaces.com",
  region: "nyc3",
  forcePathStyle: false,
  credentials: {
    accessKeyId: process.env.DO_ACCESS_KEY as string,
    secretAccessKey: process.env.DO_SECRET_KEY as string,
  },
});

export default s3Client;
