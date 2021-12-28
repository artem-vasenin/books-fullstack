import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateAppDataStructure1635096008700 implements MigrationInterface {
    name = 'CreateAppDataStructure1635096008700'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "category" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "alias" character varying NOT NULL, "description" character varying NOT NULL DEFAULT '', "active" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "book" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "year" integer NOT NULL, "description" character varying NOT NULL, "alias" character varying NOT NULL, "image" character varying NOT NULL DEFAULT '', "authorId" integer, "categoryId" integer, CONSTRAINT "PK_a3afef72ec8f80e6e5c310b28a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "author" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "middleName" character varying NOT NULL, "lastName" character varying NOT NULL, "description" character varying NOT NULL DEFAULT '', "image" character varying NOT NULL DEFAULT '', CONSTRAINT "PK_5a0e79799d372fe56f2f3fa6871" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "nickname" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" character varying NOT NULL DEFAULT 'user', "blocked" boolean NOT NULL DEFAULT false, "blockReason" character varying NOT NULL DEFAULT '', CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_favorite_books_book" ("userId" integer NOT NULL, "bookId" integer NOT NULL, CONSTRAINT "PK_2930048a7dbe67b20dd8fa1589b" PRIMARY KEY ("userId", "bookId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_35a5f7ea6b783b4848dfb60c8c" ON "user_favorite_books_book" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_eeae6b10d37d4028a26940e75e" ON "user_favorite_books_book" ("bookId") `);
        await queryRunner.query(`ALTER TABLE "book" ADD CONSTRAINT "FK_66a4f0f47943a0d99c16ecf90b2" FOREIGN KEY ("authorId") REFERENCES "author"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "book" ADD CONSTRAINT "FK_efaa1a4d8550ba5f4378803edb2" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_favorite_books_book" ADD CONSTRAINT "FK_35a5f7ea6b783b4848dfb60c8cf" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_favorite_books_book" ADD CONSTRAINT "FK_eeae6b10d37d4028a26940e75ed" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_favorite_books_book" DROP CONSTRAINT "FK_eeae6b10d37d4028a26940e75ed"`);
        await queryRunner.query(`ALTER TABLE "user_favorite_books_book" DROP CONSTRAINT "FK_35a5f7ea6b783b4848dfb60c8cf"`);
        await queryRunner.query(`ALTER TABLE "book" DROP CONSTRAINT "FK_efaa1a4d8550ba5f4378803edb2"`);
        await queryRunner.query(`ALTER TABLE "book" DROP CONSTRAINT "FK_66a4f0f47943a0d99c16ecf90b2"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_eeae6b10d37d4028a26940e75e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_35a5f7ea6b783b4848dfb60c8c"`);
        await queryRunner.query(`DROP TABLE "user_favorite_books_book"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "author"`);
        await queryRunner.query(`DROP TABLE "book"`);
        await queryRunner.query(`DROP TABLE "category"`);
    }

}
