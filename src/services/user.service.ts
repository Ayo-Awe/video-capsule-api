import mongoose, { Types } from "mongoose";
import { CreateUserDTO } from "../dto/user.dto";
import User from "../models/user.model";

class UserService {
  async create(data: CreateUserDTO) {
    // Create a new user
    return User.create(data);
  }

  // Find user by id or email
  async getOne(selector: string | Types.ObjectId) {
    // Find User by email
    if (typeof selector == "string") return User.findOne({ email: selector });

    // Find User by id
    if (mongoose.isValidObjectId(selector)) return User.findById(selector);
  }

  // Delete user by id
  async delete(id: Types.ObjectId) {
    // Delete user by id
    return User.findByIdAndDelete(id);
  }

  // Update User firstname or lastname
  async update(id: Types.ObjectId, data: Omit<CreateUserDTO, "email">) {
    return User.findByIdAndUpdate(id, data);
  }
}

export default new UserService();
