import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import swaggerUI from "swagger-ui-express";
import "reflect-metadata";
import swaggerDocument from "swagger.json";

import { AppError } from "@shared/errors/AppError";

import createConnection from "../typeorm";
import { router } from "./routes";

import "@shared/container";

createConnection();
const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use(router);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }

    return response.status(500).json({
      status: "error",
      message: `Internal Server Error: ${err}`,
    });
  }
);

app.listen(3333, () => {
  console.log("API is running on port 3333");
});
