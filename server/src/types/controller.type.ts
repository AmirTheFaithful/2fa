import { Response } from "express";

/**
 * Controller action method response with payload.
 * @template {T} payload - Response payload value.
 * @property {string} message - Server's incomming message.
 */
export interface ControllerResponseBody<T> {
  payload: T;
  message: string;
}

/**
 * Controller action method response without any payload.
 * @property {string} message - Server's incomming message.
 */
export interface VoidControllerResponseBody {
  message: string;
}

/**
 * Controller action method return type that may or may not contain payload, but allways contains a message.
 * @template {T} - Response payload value.
 */
export type ControllerActionReturnType<T> = Promise<
  Response<ControllerResponseBody<T> | VoidControllerResponseBody>
>;

/**
 * Controller action method return type that does not contain any payload in it's response body. Used for exception case returns ONLY.
 */
export type VoidControllerActionReturnType = Promise<
  Response<VoidControllerResponseBody>
>;

/**
 * Describes to what type the handler belongs.
 */
export type RequestHandlerType = "controller" | "middleware";

/**
 * Used for extending only. Can be extended by a controller class or the middleware.
 * @protected {string} name - Name of the request handler.
 * @protected {RequestHandlerType} type - Type of the handler.
 */
export class RequestHandler {
  protected name: string;
  protected type: RequestHandlerType;

  constructor(type: RequestHandlerType, name: string) {
    this.type = type;
    this.name = name + type;
  }

  /**
   * Handles exception by logging a brief information about it and returns server response with 'Internal server error.' message with status code of 500.
   * @param {Error} error - Object of the occurred error.
   * @param {express.Response<ControllerResponseBody<T>>} res - response object of the specified request handler.
   * @returns {ControllerActionReturnType<T>} - Standard server request handler class response.
   */
  protected async handleException(
    error: Error,
    res: Response<VoidControllerResponseBody>
  ): VoidControllerActionReturnType {
    console.log(
      `\x1b[34mAn\x1b[0m \x1b[37m${error.name}\x1b[0m \x1b[34moccurred on ${this.name}, with message:\x1b[0 \x1b[37m${error.message}\x1b[0m`
    );
    return res.status(500).json({ message: "Internal server error." });
  }
}

/**
 * Represents a controller which is instance of the more abstract RequestHandler class. Typically should contain controller actions - handling HTTP requests methods.
 */
export class Controller extends RequestHandler {
  constructor(name: string) {
    super("controller", name);
  }
}

/**
 * Represents a middleware which is instance of the more abstract RequestHandler class. Typically, doesn't contain any methods.
 */
export class Middleware extends RequestHandler {
  constructor(name: string) {
    super("middleware", name);
  }
}
