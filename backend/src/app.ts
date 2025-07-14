import express from "express";
import config from "config";
import connect from "./utils/connect";
import logger from "./utils/logger";
import routes from "./routes";
import deserializeUser from "./middleware/deserializeUser";
import cors from "cors";

console.log("Mongo URI:", config.get<string>("dbUri"));

const port = config.get<number>("port");
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // frontendin osoite
    credentials: true, // jos käytät evästeitä (ei pakollinen JWT:lle)
  })
);

// Middlewaret
app.use(express.json());
app.use(deserializeUser);

routes(app);

app.listen(port, async () => {
  logger.info(`Appi on kaynnissa osoitteessa http://localhost:${port}`);

  await connect();
});
