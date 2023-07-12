import { AppDataSource } from "./data-source";
import { Express, Response, Request } from "express";
import express from "express";
import "reflect-metadata";

const cors = require("cors");
const app: Express = express();
const port = process.env.PORT || 5500;

const routers = require("./routes/index");

app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("Server is ready!");
});

app.use("/", routers);

app.listen(port, () => {
  console.log(`***** Server is listening at localhost:${port} *****`);
});

// Connect to mysql DB
AppDataSource.initialize().then(() => {
  console.log("***** DB connection success *****");
});
