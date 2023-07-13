import { IsString } from 'class-validator';

export class FindProvider {
  @IsString()
  search: string;
}
