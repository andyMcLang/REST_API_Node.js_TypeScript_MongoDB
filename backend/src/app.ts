import config from "config";
import connect from "./utils/connect";
import logger from "./utils/logger";
import cors from "cors";
import createServer from "./utils/server";

console.log("Mongo URI:", config.get<string>("dbUri"));

const port = config.get<number>("port");

const app = createServer();

app.use(
  cors({
    origin: "http://localhost:5173", // frontendin osoite
    credentials: true, // jos käytät evästeitä (ei pakollinen JWT:lle)
  })
);

app.listen(port, async () => {
  logger.info(`Appi on kaynnissa osoitteessa http://localhost:${port}`);

  await connect();
});
