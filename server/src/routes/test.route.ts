import { Router, Request, Response } from "express";

import TestController from "../controllers/test.controller";

const controller: TestController = new TestController();

export default (router: Router): void => {
  router.get("/api/", async (req: Request, res: Response): Promise<void> => {
    await controller.getGreeting(req, res);
  });
};
