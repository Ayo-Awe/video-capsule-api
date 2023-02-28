import { Types } from "mongoose";
import agenda from "../config/agenda.config";
import s3Client from "../config/aws.config";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { ShipCapsule } from "../job";
import Capsule, { ICapsule } from "../models/capsule.model";
import { IUser } from "../models/user.model";
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
    const recipients: ShipCapsule[] = [{ email: capsule.email, capsuleId }];

    capsule.subscribers?.forEach(({ email }) => {
      recipients.push({ email, capsuleId, isSubscriber: true });
    });

    // Schedule all capsules for delivery
    const caps = recipients.map(async (r) => {
      await agenda.schedule(capsule.unlockDate, "ship-capsule", r);
    });

    // Schedule all jobs or none
    Promise.all(caps).catch(async () => {
      await agenda.cancel({ capsuleId });
      throw new Error("Some capsules failed to be scheduled");
    });
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
