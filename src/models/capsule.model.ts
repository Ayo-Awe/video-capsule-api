import mongoose, { Types, Schema, Model } from "mongoose";
import _ from "lodash";

export interface ICapsule {
  _id: string;
  email: string;
  s3Key: string;
  caption: string;
  unlockDate: Date | string;
  status: string;
  createdAt: Date | string;
}

export interface ICapsuleMethods {
  format(): Omit<ICapsule, "s3Key">;
}

type CapsuleModel = Model<ICapsule, {}, ICapsuleMethods>;

const CapsuleSchema = new mongoose.Schema<
  ICapsule,
  CapsuleModel,
  ICapsuleMethods
>({
  email: { type: String, required: true },
  unlockDate: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
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
    enum: ["unconfirmed", "scheduled", "delivered"],
    default: "unconfirmed",
  },
});

CapsuleSchema.method("format", function () {
  const prps = ["_id", "email", "caption", "status", "createdAt", "unlockDate"];
  return _.pick(this, ...prps) as Omit<ICapsule, "s3Key">;
});

const Capsule = mongoose.model<ICapsule, CapsuleModel>(
  "Capsule",
  CapsuleSchema
);
export default Capsule;
