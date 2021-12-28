import { ApiCreatedResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";

import { CategoryService } from "./category.service";
import { CategoryEntity } from "./category.entity";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { AuthGuard } from "../user/guards/auth.guard";
import { DeleteResult } from "typeorm";

@ApiTags('category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiOperation({ summary: 'Get all books categories' })
  @ApiCreatedResponse({
    description: 'The categories list has ben fetched',
    type: [CategoryEntity]
  })
  @Get()
  async getList(): Promise<CategoryEntity[]> {
    return await this.categoryService.getList();
  }

  @ApiOperation({ summary: 'Get category by alias' })
  @ApiCreatedResponse({
    description: 'The list of categories has ben fetched',
    type: CategoryEntity,
  })
  @Get(':alias')
  async getCategory(@Param('alias') alias: string): Promise<CategoryEntity> {
    return await this.categoryService.getCategory(alias);
  }

  @ApiOperation({ summary: 'Create new category' })
  @ApiCreatedResponse({
    description: 'Category has ben created',
    type: CategoryEntity,
  })
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() dto: CreateCategoryDto): Promise<CategoryEntity> {
    return await this.categoryService.create(dto);
  }

  @ApiOperation({ summary: 'Update category info' })
  @ApiCreatedResponse({
    description: 'Category has ben updated',
    type: CategoryEntity,
  })
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() dto: CreateCategoryDto,
  ): Promise<CategoryEntity> {
    return await this.categoryService.update(id, dto);
  }

  @ApiOperation({ summary: 'Delete categoey by alias' })
  @ApiCreatedResponse({
    description: 'Category has ben deleted',
    type: DeleteResult,
  })
  @UseGuards(AuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<DeleteResult> {
    return await this.categoryService.delete(id);
  }
}