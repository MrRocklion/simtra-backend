import { MigrationInterface, QueryRunner } from "typeorm";

export class VehicleUser1749399173139 implements MigrationInterface {
    name = 'VehicleUser1749399173139'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "lastname" character varying NOT NULL, "dni" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "status" boolean NOT NULL, CONSTRAINT "UQ_5fe9cfa518b76c96518a206b350" UNIQUE ("dni"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "vehicles" ("id" SERIAL NOT NULL, "plate" character varying NOT NULL, "brand" character varying NOT NULL, "model" character varying NOT NULL, "year" integer NOT NULL, "status" boolean NOT NULL, "userId" integer, CONSTRAINT "PK_18d8646b59304dce4af3a9e35b6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "gps" DROP COLUMN "vehicleId"`);
        await queryRunner.query(`ALTER TABLE "gps" ADD "vehicleId" integer`);
        await queryRunner.query(`ALTER TABLE "gps" ADD CONSTRAINT "FK_e0f125c94ea64fa0cf096fde36f" FOREIGN KEY ("vehicleId") REFERENCES "vehicles"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vehicles" ADD CONSTRAINT "FK_20f139b9d79f917ef735efacb00" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vehicles" DROP CONSTRAINT "FK_20f139b9d79f917ef735efacb00"`);
        await queryRunner.query(`ALTER TABLE "gps" DROP CONSTRAINT "FK_e0f125c94ea64fa0cf096fde36f"`);
        await queryRunner.query(`ALTER TABLE "gps" DROP COLUMN "vehicleId"`);
        await queryRunner.query(`ALTER TABLE "gps" ADD "vehicleId" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "vehicles"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
