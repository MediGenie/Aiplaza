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
  interest_disease: string;

  @IsString()
  interest_field: string;

  @IsString()
  interest_video_mobility: string;

  @IsString()
  interest_grade: string;

  @IsString()
  biz_name: string;

  @IsString()
  forecasts_number_per_month: string;
}
