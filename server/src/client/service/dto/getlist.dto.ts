import { IsArray, IsOptional, IsString } from 'class-validator';
import { PaginateDto } from 'src/common/paginate';

export class GetListDto extends PaginateDto {
  @IsString()
  @IsOptional()
  search?: string;

  @IsOptional()
  @IsString({ each: true })
  sort?: string;

  @IsString()
  @IsOptional()
  order?: string;

  @IsString()
  @IsOptional()
  num?: string;
}
