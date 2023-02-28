import { Job, JobAttributesData, Agenda } from "agenda";
import capsuleService from "./services/capsule.service";
import emailService from "./services/email.service";
import { Types } from "mongoose";

export interface ShipCapsule extends JobAttributesData {
  capsuleId: string | Types.ObjectId;
}

async function shipCapsule(job: Job<ShipCapsule>) {
  const { capsuleId } = job.attrs.data;

  // Get capsule from database
  const capsule = await capsuleService.findOne(capsuleId);
  if (!capsule) return job.fail("Capsule with id not found");

  await emailService.sendCapsuleEmail(capsule);
}

export function registerJobs(agenda: Agenda) {
  agenda.define<ShipCapsule>("ship-capsule", shipCapsule);
}
