import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { BookEntity } from "../book/book.entity";

@Entity({ name: 'author' })
export class AuthorEntity {
  @ApiProperty({ example: 1, description: 'Author identity number' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Сергей', description: 'Author first name' })
  @Column()
  firstName: string;

  @ApiProperty({ example: 'Сергеевич', description: 'Author middle name' })
  @Column()
  middleName: string;

  @ApiProperty({ example: 'Сергеев', description: 'Author last name' })
  @Column()
  lastName: string;

  @ApiProperty({ example: 'Краткая биография Сергеева СС', description: 'Author biography' })
  @Column({ default: '' })
  description: string;

  @ApiProperty({ example: 'sergey.png', description: 'Author photography' })
  @Column({ default: '' })
  image: string;

  @ApiProperty({ example: [], description: 'Author`s books bibliography' })
  @OneToMany(() => BookEntity, (book) => book.author, { eager: true })
  books: BookEntity[];
}
