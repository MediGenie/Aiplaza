import { IsArray, IsString } from 'class-validator';

export class RestoreAccountDto {
  @IsArray()
  @IsString({ each: true })
  _ids: string[];
}
