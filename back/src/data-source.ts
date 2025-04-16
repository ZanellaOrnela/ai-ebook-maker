import { DataSource } from "typeorm";
import { User } from "./entities/User";
import { Ebook } from "./entities/Ebook";
import { Prompt } from "./entities/Prompt";
import { Chapter } from "./entities/Chapter";
import { Section } from "./entities/Section";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USERNAME || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  database: process.env.DB_NAME || "ai_ebook_maker",
  synchronize: true,
  logging: true,
  entities: [User, Ebook, Prompt, Chapter, Section],
  subscribers: [],
  migrations: [],
}); 