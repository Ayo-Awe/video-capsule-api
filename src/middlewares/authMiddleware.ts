import { handleAsync, verifyJWT } from "../utils/helpers";
import { Unauthorized } from "../errors/httpErrors";
import userService from "../services/user.service";

// Auth middleware
export const auth = handleAsync(async (req, res, next) => {
  // Get auth from header
  const { authorization } = req.headers;

  // Missing auth header
  if (!authorization) throw new Unauthorized("Missing Authorization Header");

  // Token is a bearer token format i.e `Bearer <token>`
  const token = authorization.split(" ")[1];

  // Malformed auth token
  if (!token) throw new Unauthorized("Malformed Token");

  // payload is defined when error is null and vice versa
  const { payload } = verifyJWT(token);

  // Invalid or expired token
  if (!payload) throw new Unauthorized("Invalid or Expired Auth Token");

  // Get user
  const user = await userService.getById(payload.uid);

  if (!user) throw new Unauthorized("Invalid Auth Token");

  req.user = user;

  next();
});
