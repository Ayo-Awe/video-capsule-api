import { NextFunction, Request, Response, RequestHandler } from "express";
import { IUser } from "../models/user.model";
import jwt, { SignOptions } from "jsonwebtoken";

export function handleAsync(callback: RequestHandler) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await callback(req, res, next);
    } catch (error) {
      next(error);
    }
  };
}

export function generateLoginToken(user: IUser) {
  // Jwt payload
  const payload = {
    uid: user._id,
  };

  // Define jwt options
  const options: SignOptions = {
    expiresIn: "2 days",
  };

  // Create new token
  const token = jwt.sign(payload, process.env.SECRET as string, options);

  return token;
}
