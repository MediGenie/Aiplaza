import { IsString } from 'class-validator';

export class UpdateOneDto {
  @IsString()
  note: string;
}
