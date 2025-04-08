import { DataSource } from "typeorm";
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } from "./envs";
import { Ebook } from "../entities/Ebook";
import { User } from "../entities/User";
import { Prompt } from "../entities/Prompt";
import { Section } from "../entities/Section";
import { Chapter } from "../entities/Chapter";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  synchronize: true,
  // dropSchema: true,
  logging: false,
  entities: [Ebook, User, Prompt, Section, Chapter],
  subscribers: [],
  migrations: [],
});
