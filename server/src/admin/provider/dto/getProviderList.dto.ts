import { IsArray, IsOptional, IsString } from 'class-validator';
import { PaginateDto } from 'src/common/paginate';

export class GetProviderListDto extends PaginateDto {
  @IsString()
  @IsOptional()
  search?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  sort?: string[];

  @IsOptional()
  @IsString({ each: true })
  search_attr?: string;
}
