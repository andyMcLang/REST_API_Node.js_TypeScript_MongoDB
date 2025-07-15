import config from "config";
import connect from "./utils/connect";
import logger from "./utils/logger";
import createServer from "./utils/server";

console.log("Mongo URI:", config.get<string>("dbUri"));

const port = config.get<number>("port");

const app = createServer();

app.listen(port, async () => {
  logger.info(`Appi on kaynnissa osoitteessa http://localhost:${port}`);

  await connect();
});
