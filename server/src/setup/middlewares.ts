import { Application } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import passport from "passport";

// Middlewares configurations imports.
import corsOptions from "../config/cors";

export default (app: Application): void => {
  app.use(bodyParser.json());
  app.use(cors(corsOptions()));
  app.use(morgan("dev"));
  app.use(passport.initialize());
  app.use(passport.session());
};
