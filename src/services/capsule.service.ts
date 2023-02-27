import { Types } from "mongoose";
import agenda from "../config/agenda.config";
import { ShipCapsule } from "../job";
import Capsule, { ICapsule } from "../models/capsule.model";
import { IUser } from "../models/user.model";

class CapsuleService {
  // Create a capsule
  create(data: ICapsule) {
    return Capsule.create(data);
  }

  // Delete a single capsule
  delete(capsuleId: string | Types.ObjectId) {
    return Capsule.findByIdAndDelete(capsuleId);
  }

  // Get all capsule associated with a user
  findAll(userId: string | Types.ObjectId) {
    return Capsule.find({ userId });
  }

  // Find a single capsule
  findOne(capsuleId: string | Types.ObjectId) {
    return Capsule.findById(capsuleId);
  }

  // Schedule a capsule for delivery to recipients
  async schedule(capsuleId: string | Types.ObjectId) {
    const capsule = await Capsule.findById(capsuleId).populate<{
      userId: IUser;
    }>("userId");

    if (!capsule) throw Error("Capsule Not Found");

    // Create array of capsule recipients
    const recipients: ShipCapsule[] =
      capsule.subscribers?.map(({ email }) => {
        return { email, capsuleId, isSubscriber: true };
      }) || [];

    // Add Capsule creator to recipients
    recipients.push({ email: capsule.userId.email, capsuleId });

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
}

export default new CapsuleService();
