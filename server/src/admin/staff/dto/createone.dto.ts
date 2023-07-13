import { IsBoolean, IsString } from 'class-validator';

export class CreateOneDto {
  @IsString()
  email: string;

  @IsString()
  name: string;
}
