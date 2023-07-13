import { IsString } from 'class-validator';

export class GetServiceListDto {
  @IsString()
  page: number;
}
