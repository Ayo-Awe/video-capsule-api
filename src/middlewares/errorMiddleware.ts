import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import logger from "../config/winston.config";
import { BaseError } from "../errors/httpErrors";
import { HttpErrorCode } from "../types/errors";

export const errorHandler = (
  err: Error | BaseError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // If Custom HTTP error
  if (err instanceof BaseError)
    return res.status(err.statusCode).json(formatError(err.message));

  res
    .status(HttpErrorCode.ServerError)
    .json(formatError("Internal Server Error"));
};

// This function formats an error response
const formatError = (message: string, errors?: Object) => ({
  success: false,
  message,
  errors,
});

export const errorLogger: ErrorRequestHandler = (err, req, res, next) => {
  // Only log non HTTP errors i.e Don't log bad request errors etc
  if (!err.statusCode) logger.error(err.message, err);

  next(err);
};
