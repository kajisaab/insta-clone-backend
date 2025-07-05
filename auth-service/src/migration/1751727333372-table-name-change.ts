import { MigrationInterface, QueryRunner } from "typeorm";

export class TableNameChange1751727333372 implements MigrationInterface {
    name = 'TableNameChange1751727333372'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "instagram"."kafka_dlq" ("id" text NOT NULL, "topic" text NOT NULL, "message" text NOT NULL, "error" text NOT NULL, "timestamp" TIMESTAMP, "status" text NOT NULL, CONSTRAINT "PK_172412c3dff2a1af0aaf65df4fc" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "instagram"."kafka_dlq"`);
    }

}
