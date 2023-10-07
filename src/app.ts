const express = require("express");
import cors from "cors";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler";
import v1Router from "./routes/v1";
import { NextFunction, Request, Response } from "express";
const { sequelize } = require("./models");

const app = express();
const port = 3000;

app.use(express.json());

app.use(cors());

app.use("/api/v1", v1Router);

app.use(notFoundHandler);
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  errorHandler(err, req, res, next);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

export default app;
