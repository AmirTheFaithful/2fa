import { Request, Response } from "express";

import { Controller, ControllerActionReturnType } from "../types/controller";

export default class TestController extends Controller<string> {
  constructor() {
    super("Test");
  }

  public async getGreeting(
    req: Request,
    res: Response
  ): ControllerActionReturnType<string> {
    try {
      return res
        .status(200)
        .json({ payload: "Hello!", message: "Fetch success." });
    } catch (error: any) {
      return this.handleException(error, res);
    }
  }
}
