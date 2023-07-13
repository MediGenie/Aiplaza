import { IsArray, IsOptional, IsString } from 'class-validator';
import { PaginateDto } from 'src/common/paginate';

export class GetListDto extends PaginateDto {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  sort?: string[];
}
