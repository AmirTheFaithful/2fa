import { Request, Response, NextFunction } from "express";

import { User } from "../types/user.type";
import { ControllerActionReturnType } from "../types/controller.type";

const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.isAuthenticated()) {
    res.status(401).json({ message: "Unauthorized." });
    return;
  }

  next();
};

export default isAuthenticated;
