import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCityTable1776673872098 implements MigrationInterface {
    name = 'CreateCityTable1776673872098'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "cities" ("id" integer NOT NULL, "name" character varying NOT NULL, "lat" numeric(10,7) NOT NULL, "lon" numeric(10,7) NOT NULL, "country" character varying(2) NOT NULL, "state" character varying NOT NULL, "admin1" character varying NOT NULL, "admin2" character varying NOT NULL, "pop" integer NOT NULL, CONSTRAINT "PK_4762ffb6e5d198cfec5606bc11e" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "cities"`);
    }

}
