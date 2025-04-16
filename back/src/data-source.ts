import { DataSource } from "typeorm";
import { User } from "./models/user.model";
import { Ebook } from "./models/ebook.model";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USERNAME || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  database: process.env.DB_NAME || "ai_ebook_maker",
  synchronize: true,
  logging: true,
  entities: [User, Ebook],
  subscribers: [],
  migrations: [],
}); 