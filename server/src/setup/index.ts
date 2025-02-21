import express, { Application } from "express";

import setupMiddlewares from "./middlewares";
import setupRoutes from "./routes";

const app: Application = express();

setupMiddlewares(app);
setupRoutes(app);

export default app;
