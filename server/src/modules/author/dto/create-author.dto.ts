import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateAuthorDto {
  @ApiProperty({ example: 'Сергей', description: 'Author first name' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: 'Сергеевич', description: 'Author middle name' })
  @IsString()
  @IsNotEmpty()
  middleName: string;

  @ApiProperty({ example: 'Сергеев', description: 'Author last name' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ example: 'Краткая биография Сергеева СС', description: 'Author biography' })
  description: string;

  @ApiProperty({ example: 'sergey.png', description: 'Author photography' })
  image: string;
}