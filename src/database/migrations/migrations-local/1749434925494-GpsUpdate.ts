import { MigrationInterface, QueryRunner } from "typeorm";

export class GpsUpdate1749434925494 implements MigrationInterface {
    name = 'GpsUpdate1749434925494'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "gps" DROP COLUMN "speed"`);
        await queryRunner.query(`ALTER TABLE "gps" DROP COLUMN "course"`);
        await queryRunner.query(`ALTER TABLE "gps" DROP COLUMN "event"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "gps" ADD "event" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "gps" ADD "course" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "gps" ADD "speed" integer NOT NULL`);
    }

}
