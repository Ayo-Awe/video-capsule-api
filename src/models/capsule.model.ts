import mongoose, { Types, Schema } from "mongoose";

export interface ICapsule {
  _id: string;
  email: string;
  s3Key: string;
  caption: string;
  unlockDate: Date | string;
  status: string;
}

const CapsuleSchema = new mongoose.Schema<ICapsule>({
  email: { type: String, required: true },
  unlockDate: {
    type: Date,
    required: true,
  },
  s3Key: {
    type: String,
    required: true,
  },
  caption: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["unconfirmed", "sent", "delivered"],
    default: "unconfirmed",
  },
});

const Capsule = mongoose.model<ICapsule>("Capsule", CapsuleSchema);
export default Capsule;
