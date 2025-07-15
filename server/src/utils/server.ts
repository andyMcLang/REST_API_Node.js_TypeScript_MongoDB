import express from "express";
import cors from "cors";
import config from "config";
import deserializeUser from "../middleware/deserializeUser";
import routes from "../routes";

function createServer() {
  const app = express();

  app.use(
    cors({
      origin: "http://localhost:3000", // tärkeä: ei saa olla "*"
      credentials: true, // sallii evästeet
    })
  );

  app.options("*", cors());

  // Middlewaret
  app.use(express.json());
  app.use(deserializeUser);

  routes(app);

  return app;
}

export default createServer;
