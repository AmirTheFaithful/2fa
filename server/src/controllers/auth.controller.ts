import { Request, Response } from "express";
import bcrypt from "bcrypt";

import UserService from "../services/user.service";

import { User } from "../types/user.type";
import { RegisterRequestBody, LoginRequestBody } from "../types/auth.type";
import {
  Controller,
  ControllerActionReturnType,
} from "../types/controller.type";

export default class AuthController extends Controller {
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
        meta: {
          firstname,
          lastname,
          email,
        },
        auth: {
          hash,
          isMfaActive: false,
        },
        system: {
          avatarURL,
        },
      });

      await newUser.save();

      return res.status(201).json({ message: "Register success." });
    } catch (error: any) {
      return this.handleException(error, res);
    }
  }

  public async login(
    req: Request,
    res: Response
  ): ControllerActionReturnType<User> {
    try {
      const { email, password }: LoginRequestBody = req.body;

      if (!email || !password) {
        return res.status(400).json({ message: "Invalid request body." });
      }

      return res
        .status(200)
        .json({ payload: req.user._id, message: "Login success." });
    } catch (error: any) {
      return this.handleException(error, res);
    }
  }

  public async logout(
    req: Request,
    res: Response
  ): ControllerActionReturnType<User> {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Unauthorized." });
      }

      // Perform logging out process.
      req.logOut(
        async (
          error: Error
        ): Promise<void | Response<User, Record<string, any>>> => {
          // Handle error if it was happened.
          if (error) {
            console.log(
              `An ${error.name} occurred while logging out a user, with message: ${error.message}.`
            );
            return res.status(400).json({ message: "Logout failure." });
          }

          // If everything went ok - go back.
          return;
        }
      );

      return res.status(200).json({ message: "Logout success." });
    } catch (error: any) {
      return this.handleException(error, res);
    }
  }
}
