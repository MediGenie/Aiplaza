import { IsNumber, IsString } from 'class-validator';

export class PatchReviewDto {
  @IsString()
  paymentId: string;

  @IsNumber()
  ratingValue: number;

  @IsString()
  review: string;
}
