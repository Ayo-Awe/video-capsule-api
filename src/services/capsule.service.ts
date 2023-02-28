import { Types } from "mongoose";
import agenda from "../config/agenda.config";
import s3Client from "../config/aws.config";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import Capsule, { ICapsule } from "../models/capsule.model";
import { GetObjectCommand } from "@aws-sdk/client-s3";

const fifteenMinutes = 60 * 15;

class CapsuleService {
  // Create a capsule
  create(data: ICapsule) {
    return Capsule.create(data);
  }

  // Delete a single capsule
  delete(capsuleId: string) {
    return Capsule.findByIdAndDelete(capsuleId);
  }

  // Get all capsule associated with a user
  findAll(email: string) {
    return Capsule.find({ email });
  }

  // Find a single capsule
  findOne(capsuleId: string | Types.ObjectId) {
    return Capsule.findById(capsuleId);
  }

  // Schedule a capsule for delivery to recipients
  async schedule(capsuleId: string | Types.ObjectId) {
    const capsule = await Capsule.findById(capsuleId);
    if (!capsule) throw Error("Capsule Not Found");

    // Create array of capsule recipients
    const data = { email: capsule.email, capsuleId };

    // Schedule all capsules for delivery
    await agenda.schedule(capsule.unlockDate, "ship-capsule", data);
  }

  async getCapsuleVideoUrl(capsuleId: string) {
    // Find capusle with capsuleId
    const capsule = await Capsule.findById(capsuleId);
    if (!capsule) throw Error("Capsule was not found");

    const objectParams = {
      Key: capsule.s3Key,
      Bucket: process.env.DO_BUCKET_NAME,
    };

    return getSignedUrl(s3Client, new GetObjectCommand(objectParams), {
      expiresIn: fifteenMinutes,
    });
  }
}

export default new CapsuleService();
