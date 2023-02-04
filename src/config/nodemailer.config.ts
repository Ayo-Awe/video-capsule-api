import { createTestAccount, createTransport } from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import path from "path";

// Create new transporter
const transporter = createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const pathToTemplates = path.resolve("../../email_templates");

transporter.use(
  "compile",
  hbs({ viewEngine: { extname: ".hbs" }, viewPath: pathToTemplates })
);

export default transporter;
