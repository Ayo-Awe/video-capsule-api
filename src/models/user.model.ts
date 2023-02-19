import mongoose, { Schema, Types } from "mongoose";

export interface IUser {
  _id: Types.ObjectId;
  firstName?: string;
  lastName?: string;
  email: string;
}

const UserSchema = new Schema<IUser>({
  firstName: String,
  lastName: String,
  email: { type: String, required: true, unique: true },
});

const User = mongoose.model<IUser>("User", UserSchema);
export default User;
