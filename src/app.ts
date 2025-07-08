import express from "express";
import config from "config";
import connect from "./utils/connect";
import logger from "./utils/logger";
import routes from "./routes";

console.log("Mongo URI:", config.get<string>("dbUri"));

const port = config.get<number>("port");

const app = express();

app.use(express.json());

app.listen(port, async () => {
  logger.info(`Appi on kaynnissa osoitteessa http://localhost:${port}`);

  await connect();

  routes(app);
});
