import { Request, Response } from "express";
import { BadRequest, Forbidden, ResourceNotFound } from "../errors/httpErrors";
import capsuleService from "../services/capsule.service";
import emailService from "../services/email.service";
import { DOFILE } from "../types";
import { validateCreateCapsule } from "../validators/capsule.validator";
import moment from "moment";
import _ from "lodash";

class CapsuleController {
  async createHandler(req: Request, res: Response) {
    if (!req.file) throw new BadRequest("Video file is required");
    req.body.s3Key = (req.file as DOFILE).key;

    // validate request body
    const { value, error } = validateCreateCapsule(req.body);
    if (error) throw new BadRequest(error.details[0].message);

    // create new capsule
    const capsule = await capsuleService.create(value);

    // Send confirmation email
    await emailService.sendConfirmationEmail(capsule);

    res
      .status(200)
      .json({ message: "Confirmation email has been sent", success: true });
  }

  async editHandler() {}

  async getOneCapsuleHandler(req: Request, res: Response) {
    const { id } = req.params;

    const capsule = await capsuleService.findOne(id);
    if (!capsule) throw new ResourceNotFound("Capsule Not Found");

    res.status(200).json({
      success: true,
      capsule,
    });
  }

  async getCapsuleUrl(req: Request, res: Response) {
    const { id } = req.params;

    const capsule = await capsuleService.findOne(id);
    if (!capsule) throw new ResourceNotFound("Capsule Not Found");

    // Capsule isn't due
    if (moment(capsule.unlockDate).isAfter(moment()))
      throw new ResourceNotFound("Capsule URL is unavailable");

    const url = await capsuleService.getCapsuleVideoUrl(id);

    res.status(200).json({ url, success: true });
  }

  async getAllCapsules(req: Request, res: Response) {
    // Get all capsules associated with the current user
    const capsules = await capsuleService.findAll(req.user?.email as string);

    res.status(200).json({
      success: true,
      capsules,
    });
  }

  async deleteHandler(req: Request, res: Response) {
    const { id } = req.params;

    const capsule = await capsuleService.findOne(id);
    if (!capsule) throw new ResourceNotFound("Capsule Not Found");

    if (capsule.email !== req.user?.email)
      throw new Forbidden("You don't have access to this resource");

    await capsuleService.delete(id);

    res.status(201).json({ success: true, deleted: capsule._id });
  }

  async confirmSchedule(req: Request, res: Response) {
    const { id } = req.params;

    // Get capsule from database
    const capsule = await capsuleService.findOne(id);
    if (!capsule) throw new ResourceNotFound("Capsule Not Found");

    // Schedule capsule
    await capsuleService.schedule(id);

    res
      .status(200)
      .json({ success: true, message: "Capsule scheduled successfully" });
  }
}

export default new CapsuleController();
