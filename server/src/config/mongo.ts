import { connect, Mongoose } from "mongoose";

import { db } from "./env";

const logException = (error: Error): void => {
  console.log(
    `An '${error.name}' happened when connecting to the server, with message '${error.message}'.`
  );
};

export default async function connectDB(): Promise<boolean> {
  try {
    await connect(db.mongo_uri);
    console.log("Succesfully connected to DB.");
    return true;
  } catch (error: any) {
    logException(error);
    return false;
  }
}
