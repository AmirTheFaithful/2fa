import { Response } from "express";
import { Model } from "mongoose";

export interface ControllerResponseBody<T> {
  payload: T;
  message: string;
}

export type ControllerActionReturnType<T> = Promise<
  Response<ControllerResponseBody<T>>
>;

export type RequestHandlerType = "controller" | "middleware";

export class RequestHandler {
  protected name: string;
  protected type: RequestHandlerType;

  constructor(type: RequestHandlerType, name: string) {
    this.type = type;
    this.name = name + type;
  }
}

export class Controller<T> extends RequestHandler {
  constructor(name: string) {
    super("controller", name);
  }

  protected async handleException(
    error: Error,
    res: Response
  ): ControllerActionReturnType<T> {
    console.log(
      `\x1b[34mAn\x1b[0m \x1b[37m${error.name}\x1b[0m \x1b[34moccurred on ${this.name}, with message:\x1b[0 \x1b[37m${error.message}\x1b[0m`
    );
    return res.status(500).json({ message: "Internal server error." });
  }
}

export class Middleware extends RequestHandler {
  constructor(name: string) {
    super("middleware", name);
  }
}
