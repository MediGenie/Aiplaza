import { IsArray, IsBoolean, IsString } from 'class-validator';

export class PermissionAccountDto {
  @IsArray()
  @IsString({ each: true })
  _ids: string[];

  @IsBoolean()
  permission: boolean;
}
