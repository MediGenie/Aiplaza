import { AccountStatus, UserType } from 'src/database/schema/account.schema';
import { IsString } from 'class-validator';

export class UpdateOneDto {
  @IsString()
  title: string;

  @IsString()
  content: string;
}
