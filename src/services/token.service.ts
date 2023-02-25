import Token from "../models/token.model";

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
  async create(email: string, token: string) {
    // Create new token
    return Token.create({
      email,
      token,
    });
  }
}

export default new TokenService();
