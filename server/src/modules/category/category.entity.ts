import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BookEntity } from "../book/book.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity({ name: 'category' })
export class CategoryEntity {
  @ApiProperty({ example: 1, description: 'Category identity number' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Fantastic', description: 'Category title' })
  @Column()
  title: string;

  @ApiProperty({ example: 'space-fantastic', description: 'Category uri alias' })
  @Column()
  alias: string;

  @ApiProperty({ example: 'Space fantastic and cyberpank', description: 'Category description' })
  @Column({ default: '' })
  description: string;

  @ApiProperty({ example: true, description: 'Category is published' })
  @Column({ default: true })
  active: boolean;

  @ApiProperty({ example: [], description: 'Category is published' })
  @OneToMany(() => BookEntity, (book) => book.category, { eager: true })
  books: BookEntity[];
}