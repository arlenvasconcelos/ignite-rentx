import express from "express";
import swaggerUI from "swagger-ui-express";

import { router } from "./routes";
import swaggerDocument from "./swagger.json";

import "./database";

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use(router);

app.listen(3333, () => {
  console.log("API is running on port 3333");
});
