import dotenv from "dotenv";

dotenv.config();

export const sys = {
  host: process.env.HOST!,
  serv_port: process.env.SERV_PORT!,
  client_port: process.env.CLIENT_PORT!,
};

export const auth = {
  scrt_key: process.env.SESSION_SECRET_KEY!,
};

export const db = {
  mongo_uri: process.env.MONGO_URI!,
};
