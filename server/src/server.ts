import { Server, createServer } from "http";

import app from "./setup";
import connectDB from "./config/mongo";

// Configurations:
import { sys } from "./config/env";

const server: Server = createServer(app);

server.listen(sys.serv_port, async (): Promise<void> => {
  if (await connectDB()) {
    console.log(`Running on ${sys.host}:${sys.serv_port}.`);
  } else {
    console.log("Connection failed. Server stopped.");
    process.exit(0);
  }
});
