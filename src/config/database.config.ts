import mongoose from "mongoose";

const mongoURI = process.env.MONGO_URI as string;

export default function connectDB(callback: () => any) {
  mongoose
    .connect(mongoURI)
    .then(() => {
      console.log("Successfully connected to database");
      callback();
    })
    .catch((error: any) => {
      console.log(error.message);
    });
}
