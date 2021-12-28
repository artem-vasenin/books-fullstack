import { IsBoolean, IsEmail, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserDto {
  @ApiProperty({ example: 'Ivan', description: 'Is not unique nickname' })
  @IsNotEmpty()
  @IsString()
  nickname: string;


  @ApiProperty({ example: 'user', description: 'User access role' })
  @IsNotEmpty()
  @IsString()
  role: string;

  @ApiProperty({ example: true, description: 'Blocked user flag' })
  @IsNotEmpty()
  @IsBoolean()
  blocked: boolean;

  @ApiProperty({ example: 'Blocked for spam and flood', description: 'Blocked reason description' })
  blockReason: string;
}
