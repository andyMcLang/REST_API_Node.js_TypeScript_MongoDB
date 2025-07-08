import dotenv from "dotenv";

dotenv.config();

export default {
  port: Number(process.env.PORT) || 1337,
  dbUri: process.env.MONGODB_URI || "",
  saltWorkFactor: Number(process.env.SALT_WORK_FACTOR) || 10,
};
