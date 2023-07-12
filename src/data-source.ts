import "reflect-metadata";
import { DataSource } from "typeorm";

// Use env variable
require("dotenv").config();

const password = process.env.DB_PASSWORD;

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "127.0.0.1",
  port: 3306,
  username: "root",
  password: password,
  database: "MIJIworld",
  synchronize: false,
  logging: true,
  entities: ["src/entity/*.{ts, js}"],
  // entities: [__dirname + "/entity/*.js"],
  migrations: ["src/migration/*"],
  subscribers: [],
});
