import { BeforeInsert, Column, Entity, ManyToMany, PrimaryGeneratedColumn, JoinTable } from "typeorm";
import { hash } from 'bcrypt';

import { BookEntity } from "../book/book.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity({ name: 'user' })
export class UserEntity {
  @ApiProperty({ example: 1, description: 'User identity number' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Ivan', description: 'Is not unique nickname' })
  @Column()
  nickname: string;

  @ApiProperty({ example: 'my@mail.com', description: 'Unique email address' })
  @Column()
  email: string;

  @ApiProperty({ example: '123', description: 'User secret password' })
  @Column()
  password: string;

  @ApiProperty({ example: 'admin', description: 'User role (user or admin)' })
  @Column({ default: 'user' })
  role: string;

  @ApiProperty({ example: true, description: 'Blocked user flag' })
  @Column({ default: false })
  blocked: boolean;

  @ApiProperty({ example: 'Blocked for spam and flood', description: 'Blocked reason description' })
  @Column({ default: '' })
  blockReason: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 10);
  }

  @ManyToMany(() => BookEntity)
  @JoinTable()
  favoriteBooks: BookEntity[];
}
