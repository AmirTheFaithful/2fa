import { Application } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";

// Middlewares configurations imports.
import corsOptions from "../config/cors";

export default (app: Application): void => {
  app.use(bodyParser.json());
  app.use(cors(corsOptions()));
  app.use(morgan("dev"));
};
