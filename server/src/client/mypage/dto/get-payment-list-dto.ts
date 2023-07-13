import { IsString } from 'class-validator';

export class GetPaymentListDto {
  @IsString()
  page: number;

  @IsString()
  order: string;
}
