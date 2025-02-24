import { Request, Response } from "express";
import bcrypt from "bcrypt";
import {
  generateSecret,
  otpauthURL,
  totp,
  GeneratedSecret,
  TotpVerifyOptions,
} from "speakeasy";
import jwt from "jsonwebtoken";
import qrcode from "qrcode";

// Utilities imports:
import UserService from "../services/user.service";
import otpauthURLOptions from "../config/otpauth";
import { auth } from "../config/env";

// Type defintions imports:
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

  /* SECTION: 1ST AUTHENTICATION FACTOR ACTIONS. */

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

  public async authStatus(
    req: Request,
    res: Response
  ): ControllerActionReturnType<User> {
    try {
      const user: User | null = req.user;

      if (!user) {
        return res.status(401).json({ message: "Status: Unauthorized." });
      }

      return res
        .status(200)
        .json({ payload: req.user._id, message: "Status: Logged in." });
    } catch (error: any) {
      return await this.handleException(error, res);
    }
  }

  public async logout(
    req: Request,
    res: Response
  ): ControllerActionReturnType<User> {
    try {
      // NOTE: Retrieve user object from the request,
      // as it would be present there if the user is
      // authenticated (passed 1st auth factor).
      const user: User | null = req.user;
      if (!user) {
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

  /* SECTION: 2ND AUTHENTICATION FACTOR ACTIONS. */

  public async setup2fa(
    req: Request,
    res: Response
  ): ControllerActionReturnType<User> {
    try {
      // READ: line 105.
      const user: User | null = req.user;

      if (!user) {
        return res.status(401).json({ message: "Unauthorized." });
      }

      // Generate 2fa secret, which is the key of second authentication factor.
      const secret: GeneratedSecret = generateSecret();

      // Set user's second factor auth values to enabled state.
      user.auth.mfaSecret = secret.base32;
      user.auth.isMfaActive = true;

      // Save user's auth section changes to DB.
      await user.save();

      // Generate otpauth URL to convert it to QR code image URL later.
      const url: string = otpauthURL(
        otpauthURLOptions(user._id as string, secret)
      );

      // Convert otpauth URL to the QR code image URL.
      const qrCodeImageURL: string = await qrcode.toDataURL(url);

      return res.status(200).json({
        payload: qrCodeImageURL,
        message: "Second factor passed successfully.",
      });
    } catch (error: any) {
      return this.handleException(error, res);
    }
  }

  public async verify2fa(
    req: Request,
    res: Response
  ): ControllerActionReturnType<User> {
    try {
      // Retrieve web token from the request headers.
      const token: string = req.headers["jwt"] as string;

      if (!token) {
        return res.status(400).json({ message: "'jwt' header is missing." });
      }

      const user: User | null = req.user;

      if (!user) {
        return res.status(403).json({ message: "Unauthorized." });
      }

      const verificationOptions: TotpVerifyOptions = {
        secret: user.auth.mfaSecret,
        encoding: "base32",
        token,
      };

      const verified = totp.verify(verificationOptions);

      if (!verified) {
        return res
          .status(400)
          .json({ message: "Invalid second factor token." });
      }

      const newToken: string = jwt.sign({ _id: user._id }, auth.scrt_key, {
        expiresIn: "1hr",
      });

      return res
        .status(200)
        .json({
          payload: newToken,
          message: "Second factor verifiaction success.",
        })
        .end();
    } catch (error: any) {
      return this.handleException(error, res);
    }
  }
}
