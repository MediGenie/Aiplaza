import { IsEnum, IsString } from 'class-validator';
import { UserType, AccountType } from 'src/database/schema/account.schema';

export class CreateFromEmailDto {
  @IsEnum(AccountType)
  type: AccountType;

  @IsEnum(UserType)
  user_type: UserType;

  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsString()
  name: string;

  @IsString()
  tel: string;

  @IsString()
  country: string;

  @IsString()
  research_field: string;

  @IsString()
  analysis_field: string;

  @IsString()
  address: string;

  @IsString()
  address_detail: string;
}
