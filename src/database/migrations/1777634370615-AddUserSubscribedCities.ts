import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserSubscribedCities1777634370615 implements MigrationInterface {
    name = 'AddUserSubscribedCities1777634370615'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users_subscribed_cities_cities" ("usersId" integer NOT NULL, "citiesId" integer NOT NULL, CONSTRAINT "PK_a3c977c53992adeaebf234e47bb" PRIMARY KEY ("usersId", "citiesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_ef4c8812282b370c6ca5bda599" ON "users_subscribed_cities_cities" ("usersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_22ea5873f47c59301fb88cb1a1" ON "users_subscribed_cities_cities" ("citiesId") `);
        await queryRunner.query(`ALTER TABLE "users_subscribed_cities_cities" ADD CONSTRAINT "FK_ef4c8812282b370c6ca5bda5991" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_subscribed_cities_cities" ADD CONSTRAINT "FK_22ea5873f47c59301fb88cb1a16" FOREIGN KEY ("citiesId") REFERENCES "cities"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_subscribed_cities_cities" DROP CONSTRAINT "FK_22ea5873f47c59301fb88cb1a16"`);
        await queryRunner.query(`ALTER TABLE "users_subscribed_cities_cities" DROP CONSTRAINT "FK_ef4c8812282b370c6ca5bda5991"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_22ea5873f47c59301fb88cb1a1"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ef4c8812282b370c6ca5bda599"`);
        await queryRunner.query(`DROP TABLE "users_subscribed_cities_cities"`);
    }

}
