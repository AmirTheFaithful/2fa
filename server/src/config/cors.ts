import { CorsOptions } from "cors";

import { sys } from "./env";

export default (): CorsOptions => {
  return {
    origin: [`${sys.host}:${sys.client_port}`],
    credentials: true,
  };
};
