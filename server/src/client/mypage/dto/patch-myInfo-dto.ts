import { IsEnum, IsString } from 'class-validator';
import { UserType } from 'src/database/schema/account.schema';

export class PatchMyInfoDto {
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
}
