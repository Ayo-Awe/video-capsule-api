import { NextFunction, Request, Response, RequestHandler } from "express";
import { IUser } from "../models/user.model";
import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";

interface UserJwtPayload extends JwtPayload {
  uid: string;
}

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

// Wrapper function for jwt.verify
export function verifyJWT(token: string) {
  let payload = null;
  let error = null;

  try {
    // Verify and decode token
    payload = jwt.verify(token, process.env.SECRET as string) as UserJwtPayload;
  } catch (err: any) {
    // An error is thrown if jwt is invalid or some other error occured
    error = err;
  }

  // Either payload or error would be set while the other would be null
  return { payload, error };
}
