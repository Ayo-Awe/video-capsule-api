import { HttpErrorCode } from "../types/errors";

// Define base error class for http errors
export abstract class BaseError extends Error {
  readonly statusCode: HttpErrorCode;

  constructor(message: string, statusCode: HttpErrorCode) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
  }
}

/**
 * BadRequest Error - HTTP 400
 */
export class BadRequest extends BaseError {
  constructor(message: string = "Bad Request") {
    super(message, HttpErrorCode.BadRequest);
  }
}

/**
 * ResourceNotFound Error - HTTP 404
 */
export class ResourceNotFound extends BaseError {
  constructor(message: string = "Resource Not Found") {
    super(message, HttpErrorCode.ResourceNotFound);
  }
}

/**
 * ServerError - HTTP 500
 */
export class ServerError extends BaseError {
  constructor(message: string = "Internal Server Error") {
    super(message, HttpErrorCode.ServerError);
  }
}

/**
 * Unauthorized Error - HTTP 401
 */
export class Unauthorized extends BaseError {
  constructor(message: string = "Unauthorized") {
    super(message, HttpErrorCode.Unauthorized);
  }
}

/**
 * Forbidden Error - HTTP 402
 */
export class Forbidden extends BaseError {
  constructor(message: string = "Forbidden") {
    super(message, HttpErrorCode.Forbidden);
  }
}
