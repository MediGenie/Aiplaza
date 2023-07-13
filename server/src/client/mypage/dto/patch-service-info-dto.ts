import { IsOptional, IsString } from 'class-validator';

export class PatchServiceInfoDto {
  @IsOptional()
  @IsString()
  interest_disease: string;

  @IsOptional()
  @IsString()
  interest_field: string;

  @IsOptional()
  @IsString()
  interest_video_mobility: string;

  @IsOptional()
  @IsString()
  interest_grade: string;

  @IsOptional()
  @IsString()
  biz_name: string;

  @IsOptional()
  @IsString()
  forecasts_number_per_month: string;
}
