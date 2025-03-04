import { Schema, Model, model } from "mongoose";

import { User } from "../types/user.type";

const UserSchema: Schema<User> = new Schema<User>({
  meta: {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  auth: {
    hash: {
      type: String,
      required: true,
      min: 10,
    },
    isMfaActive: {
      type: Boolean,
      required: true,
    },
    mfaSecret: {
      type: String,
      required: false,
    },
  },
  system: {
    // All fields are optional.
    avatarURL: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAd5avdba8EiOZH8lmV3XshrXx7dKRZvhx-A&s",
    },

    prefferedColors: {
      type: [String],
      default: ["#ffacbb", "#aaccfb"],
    },
  },
});

const userModel: Model<User> = model("User", UserSchema);

export default userModel;
