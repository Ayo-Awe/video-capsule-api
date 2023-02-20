import transporter from "../config/nodemailer.config";
import { EmailOptions, EmailTemplate } from "../types/email";

export async function sendEmail<Context extends {}>(
  emailOptions: EmailOptions<Context>,
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

export function buildSignUpURL(token: string) {
  return `${process.env.BASE_URL}/auth/signup?t=${token}`;
}

export function buildLoginURL(token: string, redirect?: string) {
  // Build login link using token
  let url = `${process.env.BASE_URL}/auth/login?t=${token}`;

  // Add optional redirect to query params
  if (redirect) url += `&redirect=${redirect}`;

  return url;
}
