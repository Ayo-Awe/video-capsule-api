import mongoose, { Types, Schema } from "mongoose";

export interface ICapsule {
  userId: Types.ObjectId;
  s3Key: string;
  caption: string;
  subscribers?: [{ email: string; isConfirmed: boolean }];
  unlockDate: Date | string;
}

const CapsuleSchema = new mongoose.Schema<ICapsule>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
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
  subscribers: [
    {
      email: { type: String, required: true },
      isConfirmed: { type: Boolean, default: false },
    },
  ],
});

const Capsule = mongoose.model<ICapsule>("Capsule", CapsuleSchema);
export default Capsule;
