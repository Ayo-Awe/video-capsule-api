import mongoose, { Types, Schema } from "mongoose";

export interface IToken {
  userId: Types.ObjectId;
  expireAt?: Date;
  token: string;
}

const TokenSchema = new mongoose.Schema<IToken>({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
    unique: true,
  },
  expireAt: {
    type: Date,
    default: Date.now(),
    index: { expires: "3600s" },
  },
  token: {
    type: String,
    required: true,
  },
});

const Token = mongoose.model<IToken>("Token", TokenSchema);
export default Token;
