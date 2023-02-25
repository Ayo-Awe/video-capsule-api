import { EmailTemplate } from "../types/email";
import { buildLoginURL, buildSignUpURL, sendEmail } from "../utils/email";
import { randomBytes } from "crypto";
import tokenService from "./token.service";

// Define an email service class
class EmailService {
  sendConfirmationEmail() {}
  sendSubsriptionEmail() {}
  sendCapsuleEmail() {}

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
