import { EmailTemplate } from "../types/email";
import { buildLoginURL, buildSignUpURL, sendEmail } from "../utils/email";

// Define an email service class
class EmailService {
  sendConfirmationEmail() {}
  sendSubsriptionEmail() {}
  sendCapsuleEmail() {}

  async sendLoginEmail(email: string, token: string, redirect?: string) {
    // Generate login link
    const url = buildLoginURL(token, redirect);

    const emailOptions = {
      context: { url },
      to: email,
    };

    await sendEmail(emailOptions, EmailTemplate.Login);
  }

  async sendSignUpEmail(email: string, token: string) {
    // Generate signup link
    const url = buildSignUpURL(token);

    const emailOptions = {
      context: { url },
      to: email,
    };

    await sendEmail(emailOptions, EmailTemplate.Signup);
  }
}

// Export class as a singleton
export default new EmailService();
