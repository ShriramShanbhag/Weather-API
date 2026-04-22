import { DataSource } from "typeorm";
import { Logger } from "@nestjs/common";
import * as fs from 'fs';
import * as path from 'path';
import dataSource from '../../ormconfig';
import { City } from "../modules/city/entities/cities.entities";

async function seed() {
    Logger.log('Seeding cities...');
    Logger.log("connecting to database")
    await dataSource.initialize();
    Logger.log("connected to database")
    const filePath = path.join(__dirname, '..', 'data', 'cities500.json');
    const rawData = fs.readFileSync(filePath, 'utf-8');
    const citiesData = JSON.parse(rawData);

    console.log(`Found ${citiesData.length} cities. Beginning batch insert...`);

    const repository = dataSource.getRepository(City);

    const BATCH_SIZE = 1000;

    for (let i = 0; i < citiesData.length; i = i + BATCH_SIZE) {
        const batch = citiesData.slice(i, i + BATCH_SIZE);
        const entities = batch.map(city => ({
            id: city.id,
            name: city.name,
            country: city.country,
            state: city.state || '',
            admin1: city.admin1 || '',
            admin2: city.admin2 || '',
            lat: parseFloat(city.lat),
            lon: parseFloat(city.lon),
            pop: parseInt(city.pop) || 0
        }));

        await repository.save(entities);
        console.log(`Inserted chunk ${i} to ${i + BATCH_SIZE}...`);
    }

    console.log('Seeding completed!');
    await dataSource.destroy();
}

seed().catch(err => {
    console.error('Error during seeding:', err);
    process.exit(1);
});