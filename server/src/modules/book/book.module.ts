import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { BookController } from "./book.controller";
import { BookService } from "./book.service";
import { BookEntity } from "./book.entity";
import { AuthorEntity } from "../author/author.entity";
import { CategoryEntity } from "../category/category.entity";

@Module({
  imports: [TypeOrmModule.forFeature([BookEntity, AuthorEntity, CategoryEntity])],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
