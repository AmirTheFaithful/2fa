import { Application } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import helmet from "helmet";
import session from "express-session";
import passport from "passport";

// Middlewares configurations imports.
import corsOptions from "../config/cors";
import sessionOptions from "../config/session";
import "../config/passport";

export default (app: Application): void => {
  app.use(bodyParser.json());
  app.use(cors(corsOptions()));
  app.use(morgan("dev"));
  app.use(helmet());
  app.use(session(sessionOptions()));
  app.use(passport.initialize());
  app.use(passport.session());
};
