import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({ example: 'Ivan', description: 'Is not unique nickname' })
  @IsNotEmpty()
  @IsString()
  nickname: string;

  @ApiProperty({ example: 'my@mail.com', description: 'Unique email address' })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ example: '123', description: 'User secret password' })
  @IsNotEmpty()
  @IsString()
  password: string;
}
