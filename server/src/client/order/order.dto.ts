import { IsString } from 'class-validator';

export class CreateReadyDto {
  @IsString()
  service: string;
}
