import { MigrationInterface, QueryRunner } from "typeorm";

export class VehicleUpdate1749427030737 implements MigrationInterface {
    name = 'VehicleUpdate1749427030737'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vehicles" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "vehicles" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "vehicles" ALTER COLUMN "status" SET DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vehicles" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "vehicles" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "vehicles" DROP COLUMN "created_at"`);
    }

}
