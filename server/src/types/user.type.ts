import { Document } from "mongoose";

export interface User extends Document {
  meta: {
    firstname: string;
    lastname: string;
    email: string;
  };
  auth: {
    hash: string;
    isMfaActive: boolean;
    mfaSecret: string;
  };
  system: {
    prefferedColors: [string, string] | null;
  };
}
