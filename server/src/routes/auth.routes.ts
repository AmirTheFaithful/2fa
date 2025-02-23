import { Router, Request, Response } from "express";
import { body, validationResult } from "express-validator";

import AuthController from "../controllers/auth.controller";

import { RegisterRequestBody } from "../types/auth.type";

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
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        await controller.register(req, res);
        return;
      }

      res.status(201).send("User registered successfully.").end();
    }
  );
};
