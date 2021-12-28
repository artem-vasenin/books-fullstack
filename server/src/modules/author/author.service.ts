import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { AuthorEntity } from "./author.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, getRepository, Repository } from "typeorm";
import { CreateAuthorDto } from "./dto/create-author.dto";

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(AuthorEntity)
    private readonly authorRepo: Repository<AuthorEntity>
  ) {}

  /** Get authors list */
  async getList(): Promise<AuthorEntity[]> {
    return await this.authorRepo.find();
  }

  /** Get author by ID */
  async getAuthor(id: number): Promise<AuthorEntity> {
    const author = await this.authorRepo.findOne({ id });

    if (!author) throw new HttpException('Author is not found', HttpStatus.NOT_FOUND);

    return author;
  }

  /** Create new author */
  async create(dto: CreateAuthorDto): Promise<AuthorEntity> {
    const { firstName, middleName, lastName } = dto;
    const author = await this.authorRepo.findOne({ firstName, middleName, lastName });

    if (author) throw new HttpException('Author name must be an unique', HttpStatus.BAD_REQUEST);

    const newAuthor = new AuthorEntity();
    Object.assign(newAuthor, dto);
    return await this.authorRepo.save(newAuthor);
  }

  /** Update author by ID */
  async update(id: number, dto: CreateAuthorDto): Promise<AuthorEntity> {
    const author = await this.authorRepo.findOne({ id });

    if (!author) throw new HttpException('Author is not found', HttpStatus.NOT_FOUND);

    // @ts-ignore
    if (dto.id || dto.books) throw new HttpException('Do not hacking please', HttpStatus.BAD_REQUEST);

    Object.assign(author, dto);
    return await this.authorRepo.save(author);
  }

  /** Remove author from db */
  async delete(id: number): Promise<DeleteResult> {
    try {
      return await this.authorRepo.delete(id);
    } catch (e) {
      throw new HttpException('You must delete books this author', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}