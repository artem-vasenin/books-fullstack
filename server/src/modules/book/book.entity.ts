import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

import { AuthorEntity } from "../author/author.entity";
import { CategoryEntity } from "../category/category.entity";

@Entity({ name: 'book' })
export class BookEntity {
  @ApiProperty({ example: 1, description: 'Book identity number' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Karrie', description: 'Book title' })
  @Column()
  title: string;

  @ApiProperty({ example: 1988, description: 'Book writing year' })
  @Column()
  year: number;

  @ApiProperty({ example: 'History about poor girl...', description: 'Book annotate' })
  @Column()
  description: string;

  @ApiProperty({ example: 'karrie', description: 'Book url alias' })
  @Column()
  alias: string;

  @ApiProperty({ example: 'karrie.png', description: 'Book title page' })
  @Column({ default: '' })
  image: string;

  @ApiProperty({ example: AuthorEntity, description: 'Author' })
  @ManyToOne(() => AuthorEntity, (author) => author.books)
  author: AuthorEntity;

  @ApiProperty({ example: CategoryEntity, description: 'Category' })
  @ManyToOne(() => CategoryEntity, (category) => category.books)
  category: CategoryEntity;
}