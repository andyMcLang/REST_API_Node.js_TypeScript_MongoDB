export default {
  port: Number(process.env.PORT) || 1337,
  origin: "http://localhost:3000",
  dbUri: process.env.MONGODB_URI || "",
  saltWorkFactor: Number(process.env.SALT_WORK_FACTOR) || 10,
  accessTokenTtl: "15m",
  refreshTokenTtl: "1y",
};
