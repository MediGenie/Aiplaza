import { IsOptional, IsString } from 'class-validator';

export class PatchProviderServiceInfoDto {
  @IsOptional()
  @IsString()
  type: string;

  @IsOptional()
  @IsString()
  domain_field: string;

  @IsOptional()
  @IsString()
  biz_type: string;

  @IsOptional()
  @IsString()
  service_type: string;

  @IsOptional()
  @IsString()
  service_subject: string;

  @IsOptional()
  @IsString()
  service_range: string;

  @IsOptional()
  @IsString()
  model_type: string;

  @IsOptional()
  @IsString()
  algorithm_program_type: string;
}
