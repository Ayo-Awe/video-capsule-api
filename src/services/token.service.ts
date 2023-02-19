import Token from "../models/token.model";
import { IUser } from "../models/user.model";
import { randomBytes } from "crypto";

// Token Service class
class TokenService {
  // Retrieve a token from the database
  get(token: string) {
    return Token.findOne({ token });
  }

  // Create a new token in database
  create(user: IUser) {
    // Generate token string
    const tokenString = randomBytes(36).toString("hex");

    // Create new token
    return Token.create({
      userId: user._id,
      token: tokenString,
    });
  }
}

export default new TokenService();
