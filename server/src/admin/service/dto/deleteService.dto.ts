import { IsString } from 'class-validator';

export class DeleteServiceDto {
  @IsString()
  id: string;
}
