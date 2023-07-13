import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Account } from './account.schema';
import { Payment } from './payment.schema';

export type SalesDocument = HydratedDocument<Sales>;

export enum SalesType {
  CALCULATE = '정산',
  SALE = '서비스 판매',
  CANCEL = '결제 취소',
}

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class Sales {
  @Prop({ type: Types.ObjectId, ref: Account.name, required: true })
  owner: Types.ObjectId;

  @Prop({ type: String, enum: SalesType, required: true })
  type: SalesType;

  @Prop({ type: Number, required: true })
  previous_amount: number;

  @Prop({ type: Number, required: true })
  next_amount: number;

  @Prop({ type: Number, required: true })
  diff_amount: number;

  readonly created_at: Date;

  readonly updated_at: Date;

  readonly index: number;

  @Prop({ type: Types.ObjectId, default: null, ref: Payment.name })
  payment: Types.ObjectId;

  @Prop({ type: String, default: '' })
  note: string;
}

export const SalesSchema = SchemaFactory.createForClass(Sales);
