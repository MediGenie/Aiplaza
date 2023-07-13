import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class PaginateDto {
  @Type(() => Number)
  @IsNumber()
  page: number;
}
