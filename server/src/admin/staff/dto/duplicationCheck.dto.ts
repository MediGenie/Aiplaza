import { IsArray, IsOptional, IsString } from 'class-validator';
import { PaginateDto } from 'src/common/paginate';

export class DuplicationCheckDto {
  @IsString()
  user_id: string;
}
