import { IsString } from 'class-validator';

export class PatchOrderCancel {
  @IsString()
  id: string;

  @IsString()
  refundReason: string;
}
