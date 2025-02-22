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
    avatarURL: string;
    prefferedColors: [string, string] | null;
  };
}

export type Users = Array<User>;
