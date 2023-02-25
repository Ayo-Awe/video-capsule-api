import mongoose from "mongoose";

const mongoURI = process.env.MONGO_URI as string;

export default async function connectDB() {
  mongoose.set("strictQuery", false);
  await mongoose.connect(mongoURI);
  console.log("Successfully connected to database");
}
