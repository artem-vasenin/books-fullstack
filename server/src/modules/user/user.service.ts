import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository } from "typeorm";
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

import { CreateUserDto } from "./dto/create-user.dto";
import { UserEntity } from "./user.entity";
import { JWT_SECRET } from "../../configs/jwt.config";
import { UserResponseType } from "./types/user.types";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>
  ) {}

  /** Get all users list */
  async getList(): Promise<UserEntity[]> {
    return await this.userRepo.find();
  }

  /** Get user by email */
  async getByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepo.findOne({ email });

    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    return user;
  }

  /** Registration for new users */
  async registration(dto: CreateUserDto): Promise<UserEntity> {
    const user = await this.userRepo.findOne({ email: dto.email });

    if (user) throw new HttpException('This email is used', HttpStatus.BAD_REQUEST);

    const newUser = new UserEntity();
    Object.assign(newUser, dto);
    return await this.userRepo.save(newUser);
  }

  /** Update user data */
  async update(dto: UpdateUserDto, id: number) {
    const user = await this.userRepo.findOne({ id });

    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    // @ts-ignore
    if (dto.id || dto.email || dto.password) throw new HttpException('Do not hacking please', HttpStatus.BAD_REQUEST);

    Object.assign(user, dto);
    return await this.userRepo.save(user);
  }

  /** Delete user from db */
  async delete(id: number): Promise<DeleteResult> {
    const user = await this.userRepo.findOne({id});

    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    return await this.userRepo.delete({id});
  }

  /** Login user */
  async login(dto: Omit<CreateUserDto, 'nickname'>): Promise<UserEntity & { token: string }> {
    const user = await this.userRepo.findOne({ email: dto.email });

    if (!user) throw new HttpException('Email is not found', HttpStatus.NOT_FOUND);

    const passHash = await compare(dto.password, user.password);

    if (!passHash) throw new HttpException('Email or password is not correct', HttpStatus.BAD_REQUEST);

    delete user.password;
    return user as any;
  }

  /** Add jwt token in user data */
  buildUserResponse(user: UserEntity): UserResponseType {
    const { id, nickname, email } = user;
    const token: string = sign({ id, nickname, email }, JWT_SECRET);
    return { ...user, token }
  }
}