import { Router, Request, Response } from "express";

import UserController from "../controllers/user.controller";

const controller: UserController = new UserController();

export default (router: Router): void => {
  router.get(
    "/api/users",
    async (req: Request, res: Response): Promise<void> => {
      await controller.getAllUsers(req, res);
    }
  );
};
