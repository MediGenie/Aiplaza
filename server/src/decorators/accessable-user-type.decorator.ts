import { SetMetadata } from '@nestjs/common';
import { AccountType } from 'src/database/schema/account.schema';

export const ACCESSABLE_USER_TYPE_KEY = 'accessable_user_type';
export const AccessableUserType = (...types: AccountType[]) =>
  SetMetadata(ACCESSABLE_USER_TYPE_KEY, types);
