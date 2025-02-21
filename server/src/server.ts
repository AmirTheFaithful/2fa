import { Server, createServer } from "http";

import app from "./setup";
import { sys } from "./config/env";

const server: Server = createServer(app);

server.listen(sys.serv_port, async (): Promise<void> => {
  console.log(`Running on ${sys.host}:${sys.serv_port}.`);
});
