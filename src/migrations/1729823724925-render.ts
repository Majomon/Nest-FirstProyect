import { MigrationInterface, QueryRunner } from "typeorm";

export class Render1729823724925 implements MigrationInterface {
    name = 'Render1729823724925'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "createdAt" character varying NOT NULL, "isAdmin" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "todos" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "isCompleted" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_ca8cafd59ca6faaf67995344225" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "files" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "mimeType" character varying NOT NULL, "data" bytea NOT NULL, "todo_id" integer, CONSTRAINT "PK_6c16b9093a142e0e7613b04a3d9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "files" ADD CONSTRAINT "FK_925a2ba6622805fbc6acf2a1578" FOREIGN KEY ("todo_id") REFERENCES "todos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "files" DROP CONSTRAINT "FK_925a2ba6622805fbc6acf2a1578"`);
        await queryRunner.query(`DROP TABLE "files"`);
        await queryRunner.query(`DROP TABLE "todos"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
