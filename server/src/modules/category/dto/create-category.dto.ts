import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateCategoryDto {
  @ApiProperty({ example: 'Фантастика', description: 'Category unique name' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'Very cool book`s category', description: 'Short category description' })
  description: string;

  @ApiProperty({ example: true, description: 'Category is published or not' })
  active: boolean;
}