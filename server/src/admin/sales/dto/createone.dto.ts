import { SalesType } from './../../../database/schema/sales.schema';
import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class CreateOneDto {
  @IsString()
  owner: string;

  @Type(() => Number)
  @IsNumber()
  previous_amount: number;

  @Type(() => Number)
  @IsNumber()
  next_amount: number;

  @Type(() => Number)
  @IsNumber()
  diff_amount: number;

  @IsString()
  note: string;
}
