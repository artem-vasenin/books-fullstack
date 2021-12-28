import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository } from "typeorm";
import slugify from 'slugify';

import { BookEntity } from "./book.entity";
import { CreateBookDto } from "./dto/create-book.dto";
import { AuthorEntity } from "../author/author.entity";
import { CategoryEntity } from "../category/category.entity";

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(BookEntity)
    private readonly bookRepo: Repository<BookEntity>,
    @InjectRepository(AuthorEntity)
    private readonly authorRepo: Repository<AuthorEntity>,
    @InjectRepository(CategoryEntity)
    private readonly categoryRepo: Repository<CategoryEntity>
  ) {}

  /** Get all books list */
  async getList(): Promise<BookEntity[]> {
    return await this.bookRepo.find();
  }

  /** Get book by alias */
  async getBook(alias: string): Promise<BookEntity> {
    const book = await this.bookRepo.findOne({ alias }, { relations: ['author', 'category'] });

    if (!book) throw new HttpException('Book is not found', HttpStatus.NOT_FOUND)

    return book;
  }

  /** Create new book */
  async create(dto: CreateBookDto): Promise<BookEntity> {
    const { title, year, authorId, categoryId } = dto;
    const author = await this.authorRepo.findOne({ id: authorId });
    const category = await this.categoryRepo.findOne({ id: categoryId });

    if (!author || !category) throw new HttpException('Author or Category wrong', HttpStatus.BAD_REQUEST);

    const book = await this.bookRepo.findOne({ title, year });

    if (book) throw new HttpException('Book with this title is already has', HttpStatus.BAD_REQUEST);

    const newBook = new BookEntity();
    delete dto.authorId;
    delete dto.categoryId;
    Object.assign(newBook, dto);
    newBook.alias = slugify(dto.title, { lower: true });
    newBook.author = author;
    newBook.category = category;
    return await this.bookRepo.save(newBook);
  }

  /** Update book by ID */
  async update(id: number, dto: CreateBookDto): Promise<BookEntity> {
    const { authorId, categoryId } = dto;
    const author = await this.authorRepo.findOne({ id: authorId });
    const category = await this.categoryRepo.findOne({ id: categoryId });

    if (!author || !category) throw new HttpException('Author or Category wrong', HttpStatus.BAD_REQUEST);

    const book = await this.bookRepo.findOne({ id });

    delete dto.authorId;
    delete dto.categoryId;
    Object.assign(book, dto);
    book.alias = slugify(dto.title, { lower: true });
    book.author = author;
    book.category = category;
    return await this.bookRepo.save(book);
  }

  /** Remove book by ID */
  async delete(id: number): Promise<DeleteResult> {
    try {
      return await this.bookRepo.delete({ id });
    } catch (e) {
      console.log(e);
      throw new HttpException('Book is not deleted', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}