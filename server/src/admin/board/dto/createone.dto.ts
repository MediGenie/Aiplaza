import { IsBoolean, IsObject, IsString } from 'class-validator';
import { Media } from 'src/database/sub-schema/media.sub-schema';

export class CreateOneDto {
  @IsString()
  title: string;

  @IsString()
  content: string;
}
