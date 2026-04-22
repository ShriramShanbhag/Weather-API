import { DataSource } from "typeorm";
import { City } from "./src/modules/city/entities/cities.entities";

export default new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [City],
    migrations: ['src/database/migrations/*.ts'],
})