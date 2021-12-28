import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { ApiCreatedResponse, ApiOperation, ApiTags } from "@nestjs/swagger";

import { BookService } from "./book.service";
import { BookEntity } from "./book.entity";
import { DeleteResult } from "typeorm";
import { AuthGuard } from "../user/guards/auth.guard";
import { CreateBookDto } from "./dto/create-book.dto";

@ApiTags('book')
@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @ApiOperation({ summary: 'Get all books list' })
  @ApiCreatedResponse({
    description: 'The books list has ben fetched',
    type: [BookEntity],
  })
  @Get()
  async getList(): Promise<BookEntity[]> {
    return await this.bookService.getList();
  }

  @ApiOperation({ summary: 'Get book by alias' })
  @ApiCreatedResponse({
    description: 'The book has ben found',
    type: BookEntity,
  })
  @Get(':alias')
  async getBook(@Param('alias') alias: string): Promise<BookEntity> {
    return await this.bookService.getBook(alias);
  }

  @ApiOperation({ summary: 'Create new book' })
  @ApiCreatedResponse({
    description: 'The book has ben created',
    type: BookEntity,
  })
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  @Post()
  async create(@Body() dto: CreateBookDto): Promise<BookEntity> {
    return await this.bookService.create(dto);
  }

  @ApiOperation({ summary: 'Update book info' })
  @ApiCreatedResponse({
    description: 'The book has ben updated',
    type: BookEntity,
  })
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() dto: CreateBookDto,
  ): Promise<BookEntity> {
    return await this.bookService.update(id, dto);
  }

  @ApiOperation({ summary: 'Remove book by ID' })
  @ApiCreatedResponse({
    description: 'The book has ben deleted',
    type: DeleteResult,
  })
  @UseGuards(AuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<DeleteResult> {
    return await this.bookService.delete(id);
  }
}