import { Router, Request, Response } from "express";
import {
  body,
  validationResult,
  Result,
  ValidationError,
} from "express-validator";

import AuthController from "../controllers/auth.controller";

import { RegisterRequestBody, LoginRequestBody } from "../types/auth.type";

const controller: AuthController = new AuthController();

export default (router: Router): void => {
  router.post(
    "/auth/register",
    [
      body("email").isEmail().withMessage("Invalid email address."),
      body("password")
        .isStrongPassword()
        .withMessage("Provided passport is not strong enough."),
    ],
    async (
      req: Request<{}, {}, RegisterRequestBody>,
      res: Response
    ): Promise<void> => {
      const errors: Result<ValidationError> = validationResult(req);

      if (!errors.isEmpty()) {
        await controller.register(req, res);
        return;
      }

      res.status(201).send("User registered successfully.").end();
    }
  );

  router.post(
    "/auth/login",
    [
      body("email").isEmail().withMessage("Invalid email address."),
      body("password")
        .isStrongPassword()
        .withMessage("Provided passport is not strong enough."),
    ],
    async (
      req: Request<{}, {}, LoginRequestBody>,
      res: Response
    ): Promise<void> => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        res.status(200).json({ message: "User logged in successfully." }).end();
      }
    }
  );
};
