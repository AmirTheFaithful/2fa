import { Model } from "mongoose";
import { ObjectId } from "mongodb";

import userModel from "../models/user.model";

import { User, Users } from "../types/user.type";

export default class UserService {
  private model: Model<User>;

  constructor() {
    this.model = userModel;
  }

  public async getAllUsers(): Promise<Users> {
    return await this.model.find();
  }

  public async getUserById(id: ObjectId): Promise<User | null> {
    return await this.model.findById(id);
  }

  public async getUserByEmail(email: string): Promise<User | null> {
    return await this.model.findOne({ "meta.email": email });
  }

  public async createNewUser(data: Record<string, any>): Promise<User> {
    return new this.model(data);
  }

  public async updateUserById(
    id: ObjectId,
    data: Record<string, any>
  ): Promise<User | null> {
    return this.model.findByIdAndUpdate(id, data);
  }
}
