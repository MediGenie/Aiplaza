import { IsArray, IsString } from 'class-validator';

export class DeleteAccountDto {
  @IsArray()
  @IsString({ each: true })
  _ids: string[];
}
