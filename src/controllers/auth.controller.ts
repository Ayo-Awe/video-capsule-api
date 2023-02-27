import { Request, Response } from "express";
import { BadRequest, ResourceNotFound } from "../errors/httpErrors";
import emailService from "../services/email.service";
import tokenService from "../services/token.service";
import userService from "../services/user.service";
import { generateLoginToken } from "../utils/helpers";
import Joi from "joi";
import _ from "lodash";

class AuthController {
  async signupHandler(req: Request, res: Response) {
    // Get data from request body
    const { email } = req.body;

    // Validate request body
    const { error } = Joi.string().email().validate(email);
    if (error) throw new BadRequest(error.message);

    // Check if user already exists
    const user = await userService.getByEmail(email);
    if (user) throw new BadRequest("User already exists");

    // Check for existing signup token
    const existingToken = await tokenService.getByEmail(email);
    if (existingToken) throw new BadRequest("Email already sent");

    // Send signup email
    await emailService.sendSignUpEmail(email);

    res.status(200).json({ success: true, message: "Email Sent successfully" });
  }

  async loginHandler(req: Request, res: Response) {
    // Get data from request body
    const { email } = req.body;

    // Validate request body
    const { error } = Joi.string().email().validate(email);
    if (error) throw new BadRequest(error.message);

    // Check if user already exists
    const user = await userService.getByEmail(email);
    if (!user) throw new BadRequest("User doesn't exist");

    // Check for existing signup token
    const existingToken = await tokenService.getByEmail(email);
    if (existingToken) throw new BadRequest("Email already sent");

    // Send signup email
    await emailService.sendLoginEmail(email);

    res.status(200).json({ success: true, message: "Email Sent successfully" });
  }

  async verifyLogin(req: Request, res: Response) {
    // Get data from request body
    const { token } = req.body;

    // Get token from the database
    const existingToken = await tokenService.get(token);
    if (!existingToken) throw new BadRequest("Invalid token");

    // Get user from database
    const user = await userService.getByEmail(existingToken.email);
    if (!user) throw new ResourceNotFound("User not found");

    // Login user
    const jwt = generateLoginToken(user);

    // Delete token from database
    await existingToken.deleteOne();

    res.header("x-auth-token", jwt).json({
      success: true,
      user: _.pick(user, ["id", "email", "firstname", "lastname"]),
    });
  }

  async verifySignup(req: Request, res: Response) {
    // Get data from request body
    const { token } = req.body;

    // Get token from the database
    const existingToken = await tokenService.get(token);
    if (!existingToken) throw new BadRequest("Invalid token");

    // Create new user
    const user = await userService.create({ email: existingToken.email });

    // Login user
    const jwt = generateLoginToken(user);

    // Delete token from database
    await existingToken.deleteOne();

    res.header("x-auth-token", jwt).json({
      success: true,
      user: _.pick(user, ["id", "email", "firstname", "lastname"]),
    });
  }

  async resendAuthEmail(req: Request, res: Response) {
    // Auth Email is a login email unless isSignup is set
    const { isSignup, email } = req.body;

    // Validate email
    const { error } = Joi.string().email().validate(email);
    if (error) throw new BadRequest(error.message);

    // Get user from database
    const user = await userService.getByEmail(email);

    // Existing user tries to signup againx
    if (isSignup && user) throw new BadRequest("User already exists");

    // Trying to login non-existent user
    if (!isSignup && !user) throw new BadRequest("User doesn't exist");

    // Get and delete existing token from database
    const existingToken = await tokenService.getByEmail(email);
    if (existingToken) await existingToken.deleteOne();

    // Send auth email
    if (isSignup) await emailService.sendSignUpEmail(email);
    else await emailService.sendLoginEmail(email);

    res.status(200).json({ success: true, message: "Email Sent Successfully" });
  }
}

export default new AuthController();
