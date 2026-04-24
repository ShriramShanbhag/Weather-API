import { DataSource } from "typeorm";
import { City } from "./src/modules/city/entities/city.entity";
import * as dotenv from 'dotenv';
import { User } from "./src/modules/users/entities/user.entity";

dotenv.config();

export default new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [City, User],
    migrations: ['src/database/migrations/*.ts'],
})