import dotenv from "dotenv";

dotenv.config();

export const sys = {
  host: process.env.HOST!,
  serv_port: process.env.SERV_PORT!,
  client_port: process.env.CLIENT_PORT!,
};
