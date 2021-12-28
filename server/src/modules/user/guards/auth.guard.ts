import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";

import { IExpressRequest } from "../middlewares/auth.middleware";

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<IExpressRequest>();

    if (!request.user) throw new HttpException('Access denied', HttpStatus.UNAUTHORIZED);
    return true;
  }
}