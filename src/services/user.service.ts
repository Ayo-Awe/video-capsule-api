import mongoose, { Types } from "mongoose";
import { CreateUserDTO } from "../dto/user.dto";
import User from "../models/user.model";

class UserService {
  async create(data: CreateUserDTO) {
    // Create a new user
    return User.create(data);
  }

  async getByEmail(email: string) {
    // Find User by email
    return User.findOne({ email });
  }

  // Find user by id or email
  async getById(userId: string | Types.ObjectId) {
    return User.findById(userId);
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
