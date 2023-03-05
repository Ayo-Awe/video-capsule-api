import { EmailTemplate } from "../types/email";
import {
  buildCapsuleViewURL,
  buildConfirmationURL,
  buildLoginURL,
  buildSignUpURL,
  sendEmail,
} from "../utils/email";
import { randomBytes } from "crypto";
import tokenService from "./token.service";
import { ICapsule } from "../models/capsule.model";

// Define an email service class
class EmailService {
  async sendConfirmationEmail(capsule: Omit<ICapsule, "s3Key">) {
    // Generate confirmation link
    const url = buildConfirmationURL(capsule._id);

    const emailOptions = {
      context: { url, unlockDate: capsule.unlockDate },
      to: capsule.email,
      subject: "Capsule Confirmation",
    };

    await sendEmail(emailOptions, EmailTemplate.Confirmation);
  }

  async sendCapsuleEmail(capsule: Omit<ICapsule, "s3Key">) {
    // Generate delivery link
    const { _id, caption } = capsule;
    const url = buildCapsuleViewURL(_id);

    const emailOptions = {
      context: { url, caption },
      to: capsule.email,
      subject: "Capsule Delivery",
    };

    await sendEmail(emailOptions, EmailTemplate.Unlock);
  }

  async sendLoginEmail(email: string, redirect?: string) {
    // Generate and create new token
    const token = randomBytes(36).toString("hex");
    await tokenService.create(email, token);

    // Generate login link
    const url = buildLoginURL(token, redirect);

    const emailOptions = {
      context: { url },
      to: email,
      subject: "Login Link",
    };

    await sendEmail(emailOptions, EmailTemplate.Login);
  }

  async sendSignUpEmail(email: string) {
    // Generate and create new token
    const token = randomBytes(36).toString("hex");
    await tokenService.create(email, token);

    // Generate signup link
    const url = buildSignUpURL(token);

    const emailOptions = {
      context: { url },
      to: email,
      subject: "Signup Link",
    };

    await sendEmail(emailOptions, EmailTemplate.Signup);
  }
}

// Export class as a singleton
export default new EmailService();
