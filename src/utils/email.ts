import transporter from "../config/nodemailer.config";
import { EmailOptions, EmailTemplate } from "../types/email";

export async function sendEmail(
  emailOptions: EmailOptions,
  template: EmailTemplate
) {
  // Define mailing options
  const mailOptions = {
    ...emailOptions,
    from: process.env.EMAIL_SENDER,
    template,
  };

  // Send Email with mailing options
  return await transporter.sendMail(mailOptions);
}
