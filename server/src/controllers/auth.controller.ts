import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { body, validationResult } from "express-validator";

import UserService from "../services/user.service";

import { User, Users } from "../types/user.type";
import { RegisterRequestBody } from "../types/auth.type";
import {
  Controller,
  ControllerActionReturnType,
} from "../types/controller.type";

export default class AuthClass extends Controller {
  private service: UserService;

  constructor() {
    super("Auth");
    this.service = new UserService();
  }

  public async register(
    req: Request,
    res: Response
  ): ControllerActionReturnType<User> {
    try {
      const {
        firstname,
        lastname,
        email,
        password,
        avatarURL,
      }: RegisterRequestBody = req.body;

      if (!firstname || !lastname || !email || !password) {
        return res.status(400).json({ message: "Invalid request body." });
      }

      const existingUser: User | null = await this.service.getUserByEmail(
        email
      );

      if (existingUser) {
        return res.status(403).json({ message: "User is already registered." });
      }

      // Perform password hashing process.
      const saltRounds: number = 12;
      const hash: string = await bcrypt.hash(password, 12);

      // Fill the future account body with needed contents:
      const newUser: User = await this.service.createNewUser({
        firstname,
        lastname,
        email,
        hash,
        isMfaActive: false,
      });

      await newUser.save();

      return res.status(201).json({ message: "Register success." });
    } catch (error: any) {
      return this.handleException(error, res);
    }
  }
}
