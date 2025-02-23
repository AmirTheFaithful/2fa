import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { compare } from "bcrypt";
import { ObjectId } from "mongodb";

import UserService from "../services/user.service";

import { User } from "../types/user.type";

const service: UserService = new UserService();

passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email: string, password: string, done): Promise<void> => {
      try {
        const user: User | null = await service.getUserByEmail(email);

        if (!user) {
          return done(null, false, { message: "User not found." });
        }

        const passwordsMatch: boolean = await compare(password, user.auth.hash);

        if (!passwordsMatch) {
          return done(null, false, { message: "Incorrect password provided." });
        }

        return done(null, user);
      } catch (error: any) {
        return done(error);
      }
    }
  )
);

passport.serializeUser((user: User, done): void => {
  done(null, user._id);
});

passport.deserializeUser(async (_id: ObjectId, done): Promise<void> => {
  try {
    const user: User | null = await service.getUserById(_id);

    if (!user) {
      done(null, false);
    }

    done(null, user);
  } catch (error: any) {
    done(error);
  }
});
