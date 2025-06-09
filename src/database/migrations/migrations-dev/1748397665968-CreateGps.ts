import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateGps1748397665968 implements MigrationInterface {
    name = 'CreateGps1748397665968'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "gps" ("id" SERIAL NOT NULL, "vehicleId" character varying NOT NULL, "lat" double precision NOT NULL, "lng" double precision NOT NULL, "speed" integer NOT NULL, "course" integer NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "event" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_bc6dca5ce3daead418e202bd4d3" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "gps"`);
    }

}
