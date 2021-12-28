import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateBookDto {
  @ApiProperty({ example: 'Karrie', description: 'Book title' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 1988, description: 'Book writing year' })
  @IsNumber()
  @IsNotEmpty()
  year: number;

  @ApiProperty({ example: 'History about poor girl...', description: 'Book annotate' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 'karrie.png', description: 'Book title page' })
  @IsString()
  @IsNotEmpty()
  image: string;

  @ApiProperty({ example: 1, description: 'Author ID' })
  @IsNumber()
  @IsNotEmpty()
  authorId: number;

  @ApiProperty({ example: 2, description: 'Category ID' })
  @IsNumber()
  @IsNotEmpty()
  categoryId: number;
}