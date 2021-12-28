import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { ApiCreatedResponse, ApiOperation, ApiTags } from "@nestjs/swagger";

import { AuthorService } from "./author.service";
import { AuthorEntity } from "./author.entity";
import { DeleteResult } from "typeorm";
import { CreateAuthorDto } from "./dto/create-author.dto";
import { AuthGuard } from "../user/guards/auth.guard";

@ApiTags('author')
@Controller('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @ApiOperation({ summary: 'Get all authors list' })
  @ApiCreatedResponse({
    description: 'The authors list has ben fetched',
    type: [AuthorEntity],
  })
  @Get()
  async getList(): Promise<AuthorEntity[]> {
    return await this.authorService.getList();
  }

  @ApiOperation({ summary: 'Get author by id' })
  @ApiCreatedResponse({
    description: 'The authors has ben found',
    type: AuthorEntity,
  })
  @Get(':id')
  async getAuthor(@Param('id') id: number): Promise<AuthorEntity> {
    return await this.authorService.getAuthor(id);
  }

  @ApiOperation({ summary: 'Create new author' })
  @ApiCreatedResponse({
    description: 'The author has ben created',
    type: AuthorEntity
  })
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() dto: CreateAuthorDto): Promise<AuthorEntity> {
    return await this.authorService.create(dto);
  }

  @ApiOperation({ summary: 'Update author info' })
  @ApiCreatedResponse({
    description: 'The author has ben updated',
    type: AuthorEntity,
  })
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() dto: CreateAuthorDto,
  ): Promise<AuthorEntity> {
    return await this.authorService.update(id, dto);
  }

  @ApiOperation({ summary: 'Remove author from db' })
  @ApiCreatedResponse({
    description: 'The author has ben removed'
  })
  @UseGuards(AuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<DeleteResult> {
    return await this.authorService.delete(id);
  }
}