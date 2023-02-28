import transporter from "../config/nodemailer.config";
import { EmailOptions, EmailTemplate } from "../types/email";
import { getTemplateHtml } from "./templates";
import dotenv from "dotenv";
dotenv.config();

export async function sendEmail(
  emailOptions: EmailOptions,
  template: EmailTemplate
) {
  // Get context from emailOptions
  const { context, ...otherOptions } = emailOptions;

  // Generate html code from template
  const html = await getTemplateHtml(template, context);

  // Define mailing options
  const mailOptions = {
    ...otherOptions,
    from: process.env.EMAIL_SENDER,
    html,
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

export function buildConfirmationURL(capsuleId: string) {
  return `${process.env.BASE_URL}/capsules/${capsuleId}/confirm`;
}

export function buildCapsuleViewURL(capsuleId: string) {
  return `${process.env.BASE_URL}/public/capsules/${capsuleId}/`;
}
