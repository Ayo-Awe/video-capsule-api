import Token from "../models/token.model";
import { IUser } from "../models/user.model";
import { randomBytes } from "crypto";

// Token Service class
class TokenService {
  // Retrieve a token from the database
  get(token: string) {
    return Token.findOne({ token });
  }

  // Retrieve a token from the database by email
  getByEmail(email: string) {
    return Token.findOne({ email });
  }

  // Create a new token in database
  create(email: string) {
    // Generate token string
    const token = randomBytes(36).toString("hex");

    // Create new token
    return Token.create({
      email,
      token,
    });
  }
}

export default new TokenService();
