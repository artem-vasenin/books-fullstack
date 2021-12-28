import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CategoryEntity } from "./category.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository } from "typeorm";
import { CreateCategoryDto } from "./dto/create-category.dto";
import slugify from 'slugify';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepo: Repository<CategoryEntity>
  ) {}

  /** Get all categories list */
  async getList(): Promise<CategoryEntity[]> {
    return await this.categoryRepo.find();
  }

  /** Get category by alias */
  async getCategory(alias: string) {
    const category = await this.categoryRepo.findOne({ alias });

    if (!category) throw new HttpException('Category is not found', HttpStatus.NOT_FOUND);

    return category;
  }

  /** Create new book category */
  async create(dto: CreateCategoryDto) {
    const cat = await this.categoryRepo.findOne({ title: dto.title });

    if (cat) throw new HttpException('It is not unique title', HttpStatus.BAD_REQUEST);

    const category = new CategoryEntity();
    Object.assign(category, dto);
    category.alias = slugify(category.title, { lower: true });
    return await this.categoryRepo.save(category);
  }

  /** Update category info */
  async update(id: number, dto: CreateCategoryDto): Promise<CategoryEntity> {
    const cat = await this.categoryRepo.findOne({ id });

    if (!cat) throw new HttpException('Category is not found', HttpStatus.NOT_FOUND);

    // @ts-ignore
    if (dto.id || dto.books) throw new HttpException('Do not hacking please', HttpStatus.BAD_REQUEST);

    Object.assign(cat, dto);
    cat.alias = slugify(cat.title, { lower: true });
    return await this.categoryRepo.save(cat);
  }

  /** Remove category with books */
  async delete(id: number): Promise<DeleteResult> {
    try {
      return await this.categoryRepo.delete({ id });
    } catch (e) {
      throw new HttpException('The category has books', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}