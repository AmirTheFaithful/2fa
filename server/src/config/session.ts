import { SessionOptions } from "express-session";

import { auth } from "../config/env";

export default (): SessionOptions => {
  return {
    secret: auth.scrt_key,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 2592000000,
    },
  };
};
