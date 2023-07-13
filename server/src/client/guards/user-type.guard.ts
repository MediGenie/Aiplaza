import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';
import {
  AccountDocument,
  AccountType,
} from 'src/database/schema/account.schema';
import { ACCESSABLE_USER_TYPE_KEY } from 'src/decorators/accessable-user-type.decorator';

@Injectable()
export class UserTypeGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredUserTypes = this.reflector.getAllAndOverride<AccountType[]>(
      ACCESSABLE_USER_TYPE_KEY,
      [context.getHandler(), context.getClass()],
    );
    const user = context.switchToHttp().getRequest<Request>()
      .user as AccountDocument;
    if (!requiredUserTypes) {
      return true;
    }
    if (!user) {
      return false;
    }
    return requiredUserTypes.includes(user.type);
  }
}
