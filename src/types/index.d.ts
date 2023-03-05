import { IUser } from "../models/user.model";

export {};

declare global {
  namespace Express {
    export interface Request {
      user?: IUser;
    }
  }
}

export interface DOFILE extends Express.Multer.File {
  key: string;
}
