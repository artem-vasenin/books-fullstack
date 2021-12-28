import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateAppTablesData1635055761162 implements MigrationInterface {
    name = 'CreateAppTablesData1635055761162'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`INSERT INTO "category" ("title", "description", "alias") VALUES
            ('Ужасы', 'Описание жарна ужасы', 'ujasy'),
            ('Фантастика', 'Описание жанра фантастика', 'fantastika'),
            ('Фэнтези', 'Описание жанра фэнтези', 'fentezi')`);

        await queryRunner.query(`INSERT INTO "author" ("firstName", "middleName", "lastName") VALUES
            ('Семёнова', 'Мария', 'Васильевна'),
            ('Генри', 'Лайон', 'Олди'),
            ('Стивен', 'Кинг', 'Эдвин'),
            ('Пехов', 'Алексей', 'Юрьевич')`);

        await queryRunner.query(`INSERT INTO "book" ("title", "year", "description", "alias", "authorId", "categoryId") VALUES
            ('Керри', 1974, '', 'kerry', 3, 1),
            ('Волколдав', 1995, '', 'volkodav', 1, 3),
            ('Герой должен быть один', 1995, '', 'geroy-doljen-bit-odin', 2, 3)`);

        /** password 123 */
        await queryRunner.query(`INSERT INTO "user" ("nickname", "email", "password") VALUES
            ('Rusich', 'rusich@bk.ru', '$2b$10$sb6FXe8PuK8w6uioXxVgBe5UG1lJj2dGjf4PzWDlGEvhdCss7SVJ2'),
            ('Skobar', 'skobar@bk.ru', '$2b$10$sb6FXe8PuK8w6uioXxVgBe5UG1lJj2dGjf4PzWDlGEvhdCss7SVJ2')`);

        await queryRunner.query(`INSERT INTO "user_favorite_books_book" ("userId", "bookId") VALUES
            (1, 1),
            (2, 3)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {}
}
