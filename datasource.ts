import { DataSource } from "typeorm";
import { Country } from "./src/entities/country";

export const dataSource = new DataSource({
    type: "sqlite",
    entities: [Country],
    synchronize: true,
    database: 'checkpoint.db'
});