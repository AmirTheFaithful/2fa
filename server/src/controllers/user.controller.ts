import { Request, Response } from "express";
import { ObjectId } from "mongodb";

import UserService from "../services/user.service";

import { User, Users } from "../types/user.type";
import {
  Controller,
  ControllerActionReturnType,
} from "../types/controller.type";

export default class UserController extends Controller {
  private service: UserService;

  constructor() {
    super("User");
    this.service = new UserService();
  }

  private async getUserById(
    req: Request,
    res: Response
  ): ControllerActionReturnType<User> {
    try {
      if (!req.query.id) {
        return res.status(400).json({ message: "Invalid request body." });
      }

      const id: ObjectId = new ObjectId(req.query.id.toString());
      const user: User | null = await this.service.getUserById(id);

      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }

      return res.status(200).json({ payload: user, message: "Fetch success." });
    } catch (error: any) {
      return this.handleException(error, res);
    }
  }

  private async getUserByEmail(
    req: Request,
    res: Response
  ): ControllerActionReturnType<User> {
    try {
      if (!req.query.email) {
        return res.status(400).json({ message: "Invalid request body." });
      }

      const email: string = req.query.email.toString();

      const user: User | null = await this.service.getUserByEmail(email);

      if (!user) {
        return res.status(404).json({ message: "User not found." }).end();
      }

      return res.status(200).json({ payload: user, message: "Fetch success." });
    } catch (error: any) {
      return this.handleException(error, res);
    }
  }

  // Redirects to private methods if they have query string filters, otherwise - returns all user account saved in DB.
  public async getAllUsers(
    req: Request,
    res: Response
  ): ControllerActionReturnType<Users> {
    try {
      if (req.query.id) {
        return await this.getUserById(req, res);
      }

      if (req.query.email) {
        return await this.getUserByEmail(req, res);
      }

      const users: Users | null = await this.service.getAllUsers();

      if (!users) {
        return res.status(404).json({ message: "Unable fetch users." });
      }

      return res
        .status(200)
        .json({ payload: users, message: "Fetch success." });
    } catch (error: any) {
      return this.handleException(error, res);
    }
  }
}
