import { AccountType } from 'src/database/schema/account.schema';

export interface JwtPayload {
  id: string;
  email: string;
  type: AccountType;
}
