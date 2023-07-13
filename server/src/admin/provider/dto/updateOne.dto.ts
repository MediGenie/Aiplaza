import { AccountStatus, UserType } from 'src/database/schema/account.schema';
import { IsString } from 'class-validator';

export class UpdateOneDto {
  @IsString()
  status: AccountStatus;

  @IsString()
  name: string;

  @IsString()
  user_type: UserType;

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
  info_type: string;

  @IsString()
  domain_field: string;

  @IsString()
  biz_type: string;

  @IsString()
  service_type: string;

  @IsString()
  service_subject: string;

  @IsString()
  service_range: string;

  @IsString()
  model_type: string;

  @IsString()
  algorithm_program_type: string;
}
