import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { BaseError } from "../errors/httpErrors";
import { HttpErrorCode } from "../types/errors";

const errorHandler = (
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

export default errorHandler;
