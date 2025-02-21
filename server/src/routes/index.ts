import { Router } from "express";

import testRoute from "./test.route";

const router: Router = Router();
export default (): Router => {
  testRoute(router);

  return router;
};
