import { MigrationInterface, QueryRunner } from "typeorm";

export class MigrationLocal1749419123680 implements MigrationInterface {
    name = 'MigrationLocal1749419123680'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "password" character varying NOT NULL`);
    }

}
