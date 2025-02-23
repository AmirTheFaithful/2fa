import { Router } from "express";

import userRoute from "./user.routes";
import authRoute from "./auth.routes";

const router: Router = Router();
export default (): Router => {
  userRoute(router);
  authRoute(router);

  return router;
};
