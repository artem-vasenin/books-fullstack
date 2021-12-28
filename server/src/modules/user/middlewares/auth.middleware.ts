import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Response, Request } from 'express';
import { verify } from 'jsonwebtoken';

import { UserEntity } from "../user.entity";
import { JWT_SECRET } from "../../../configs/jwt.config";
import { UserService } from "../user.service";

export interface IExpressRequest extends Request {
  user?: UserEntity;
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}

  async use(request: IExpressRequest, response: Response, next: NextFunction) {
    const { authorization } = request.headers;

    if (!authorization) {
      request.user = null;
      next();
      return;
    }

    const token = authorization.split(' ')[1];

    try {
      const decode = verify(token, JWT_SECRET);

      if (!decode) throw new Error('Token is broken');

      const user = await this.userService.getByEmail(decode.email);

      if (!user) throw new Error('User is not found');

      request.user = user;
      next();
    } catch (e) {
      console.error(e);
      request.user = null;
      next();
      return;
    }
  }
}