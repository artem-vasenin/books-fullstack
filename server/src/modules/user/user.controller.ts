import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { ApiCreatedResponse, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { UserService } from "./user.service";
import { UserEntity } from "./user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserResponseType } from "./types/user.types";
import { AuthGuard } from "./guards/auth.guard";
import { UpdateUserDto } from "./dto/update-user.dto";
import { DeleteResult } from "typeorm";

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Get all users list' })
  @ApiResponse({
    description: 'The users list has been successfully fetched',
    type: [UserEntity]
  })
  @Get()
  async getList(): Promise<UserEntity[]> {
    return await this.userService.getList();
  }

  @ApiOperation({ summary: 'Get user by email' })
  @ApiResponse({
    description: 'The user has been find',
    type: UserEntity
  })
  @Get(':email')
  async getByEmail(
    @Param('email') email: string,
  ): Promise<UserEntity> {
    return await this.userService.getByEmail(email);
  }

  @ApiOperation({ summary: 'Registration new user' })
  @ApiCreatedResponse({
    description: 'The record has been successfully created',
    type: UserEntity
  })
  @Post()
  @UsePipes(new ValidationPipe())
  async registration(
    @Body() dto: CreateUserDto
  ): Promise<UserResponseType> {
    const user = await this.userService.registration(dto);
    return this.userService.buildUserResponse(user);
  }

  @ApiOperation({ summary: 'Login user' })
  @ApiCreatedResponse({
    description: 'The login has been successfully',
    type: UserEntity
  })
  @Post('login')
  @UsePipes(new ValidationPipe())
  async login(
    @Body() dto: Omit<CreateUserDto, 'username'>
  ): Promise<UserResponseType> {
    const user = await this.userService.login(dto);
    return this.userService.buildUserResponse(user);
  }

  @ApiOperation({ summary: 'Update user info' })
  @ApiCreatedResponse({
    description: 'The update has been successfully',
    type: UserEntity
  })
  @Put(':id')
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard)
  async update(
    @Body() dto: UpdateUserDto,
    @Param('id') id: number,
  ): Promise<UserResponseType> {
    const user = await this.userService.update(dto, id);
    return this.userService.buildUserResponse(user);
  }

  @ApiOperation({ summary: 'Remove user from db' })
  @Delete(':id')
  @UseGuards(AuthGuard)
  async delete(
    @Param('id') id: number,
  ): Promise<DeleteResult> {
    return await this.userService.delete(id);
  }
}