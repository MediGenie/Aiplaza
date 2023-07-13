import { IsEnum, IsString } from 'class-validator';
import { UserType, AccountType } from 'src/database/schema/account.schema';

export class CreateFromSocialDto {
  @IsString()
  social_key: string;

  @IsString()
  social_method: string;

  @IsEnum(AccountType)
  type: AccountType;

  @IsEnum(UserType)
  user_type: UserType;

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

  @IsString()
  email: string;
}
