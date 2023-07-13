import { IsString } from 'class-validator';

export class PatchPasswordDto {
  @IsString()
  password: string;
}
