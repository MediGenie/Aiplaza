import { IsOptional, IsString } from 'class-validator';

export class UpdateOneDto {
  @IsString()
  email: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  password?: string;
}
