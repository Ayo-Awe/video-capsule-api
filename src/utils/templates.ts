import { readFile } from "fs/promises";
import Handlebars from "handlebars";
import path from "path";
import { EmailTemplate } from "../types/email";

const pathToTemplates = path.resolve("./email_templates");

export async function getTemplateHtml(temp: EmailTemplate, context: object) {
  // Load template file from file system
  const file = await readFile(path.join(pathToTemplates, temp + ".hbs"));

  // Compile handlebars template
  const template = Handlebars.compile(file.toString());

  // Generate html template with context
  return template(context);
}
