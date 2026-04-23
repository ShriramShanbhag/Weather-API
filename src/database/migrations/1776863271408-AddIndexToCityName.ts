import { MigrationInterface, QueryRunner } from "typeorm";

export class AddIndexToCityName1776863271408 implements MigrationInterface {
    name = 'AddIndexToCityName1776863271408'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE INDEX "IDX_a0ae8d83b7d32359578c486e7f" ON "cities" ("name") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_a0ae8d83b7d32359578c486e7f"`);
    }

}
