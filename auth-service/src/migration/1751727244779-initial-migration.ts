import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1751727244779 implements MigrationInterface {
    name = 'InitialMigration1751727244779';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE SCHEMA IF NOT EXISTS instagram');
        await queryRunner.query(
            `CREATE TABLE "instagram"."kafka_dql" ("id" text NOT NULL, "topic" text NOT NULL, "message" text NOT NULL, "error" text NOT NULL, "timestamp" TIMESTAMP, "status" text NOT NULL, CONSTRAINT "PK_3bed9b96c3159bee01382b8eb23" PRIMARY KEY ("id"))`
        );
        await queryRunner.query(
            `CREATE TABLE "instagram"."user_credentials" ("id" text NOT NULL, "is_deleted" boolean DEFAULT false, "created_by" jsonb, "created_date_time" TIMESTAMP, "last_modified_by" jsonb, "last_modified_date_time" TIMESTAMP, "user_id" text, "max_login_attempts" integer DEFAULT '5', "login_attempts" integer DEFAULT '0', "password" text, "password_history" jsonb, CONSTRAINT "PK_5cadc04d03e2d9fe76e1b44eb34" PRIMARY KEY ("id"))`
        );
        await queryRunner.query(
            `CREATE TABLE "instagram"."user_details" ("id" text NOT NULL, "is_deleted" boolean DEFAULT false, "created_by" jsonb, "created_date_time" TIMESTAMP, "last_modified_by" jsonb, "last_modified_date_time" TIMESTAMP, "first_name" text, "last_name" text, "user_name" text, "email" text, "user_image" text, "roles" jsonb, "bio" text, "phone_number" text, "selected_theme" text, "is_active" boolean, "is_blocked" boolean, "is_verified" boolean, "logged_in_ip" jsonb, CONSTRAINT "PK_fb08394d3f499b9e441cab9ca51" PRIMARY KEY ("id"))`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "instagram"."user_details"`);
        await queryRunner.query(`DROP TABLE "instagram"."user_credentials"`);
        await queryRunner.query(`DROP TABLE "instagram"."kafka_dql"`);
    }
}
