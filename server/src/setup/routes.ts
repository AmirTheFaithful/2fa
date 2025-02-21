import { Application } from "express";

import routes from "../routes";

export default (app: Application): void => {
  console.log("enabled.");
  app.use("/", routes());
};
