import { AppDataSource } from "./data-source";
import { Express, Response, Request } from "express";
import express from "express";
import "reflect-metadata";

const cors = require("cors");
const app: Express = express();
const port = process.env.PORT || 5500;

const routers = require("./routes/index");

const corsOption = {
  origin: [
    process.env.CLIENT || "http://localhost:3000",
    process.env.STORYBOOK || "http://localhost:6006",
  ],
  credentials: true,
};

// Connect to mysql DB
AppDataSource.initialize().then(() => {
  console.log("***** DB connection success *****");
});

app.use(cors(corsOption));

app.get("/", (req: Request, res: Response) => {
  res.send("Server is ready!");
});

app.use("/", routers);

app.listen(port, () => {
  process.send("ready"); // 구동 준비가 완료되면 마스터 프로세스로 ready 요청 보냄
  console.log(`***** Server is listening at localhost:${port} *****`);
});
