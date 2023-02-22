import mongoose, { Types, Schema } from "mongoose";

const fiveMinutesInMilliseconds = 5 * 60 * 1000;

export interface IToken {
  email: string;
  expireAt?: Date;
  token: string;
}

const TokenSchema = new mongoose.Schema<IToken>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  expireAt: {
    type: Date,
    default: Date.now() + fiveMinutesInMilliseconds,
    index: { expires: "300s" },
  },
  token: {
    type: String,
    required: true,
  },
});

const Token = mongoose.model<IToken>("Token", TokenSchema);
export default Token;
