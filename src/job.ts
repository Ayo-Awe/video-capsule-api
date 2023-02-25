import { Job, JobAttributesData, Agenda } from "agenda";
import capsuleService from "./services/capsule.service";
import emailService from "./services/email.service";
import { Types } from "mongoose";

export interface ShipCapsule extends JobAttributesData {
  capsuleId: string | Types.ObjectId;
  email: string;
  isSubscriber?: boolean;
}

async function shipCapsule(job: Job<ShipCapsule>) {
  const { capsuleId, email, isSubscriber } = job.attrs.data;

  // Get capsule from database
  const capsule = await capsuleService.findOne(capsuleId);
  if (!capsule) return job.fail("Capsule with id not found");

  // Recepient is the capsule creator
  if (!isSubscriber) return await emailService.sendCapsuleEmail(email, capsule);

  // Only ship capsules to confirmed subscribers
  const recipient = capsule.subscribers?.find((sub) => sub.email == email);
  if (!recipient) return job.fail(`Not a valid capsule subscriber`);

  // Send capusle email
  if (recipient.isConfirmed)
    await emailService.sendCapsuleEmail(email, capsule);
}

export function registerJobs(agenda: Agenda) {
  agenda.define<ShipCapsule>("ship-capsule", shipCapsule);
}
