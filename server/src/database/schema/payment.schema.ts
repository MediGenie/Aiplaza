import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Account } from './account.schema';

export type PaymentDocument = HydratedDocument<Payment>;

export enum PaymentStatus {
  READY = 'ready',
  PAID = 'paid',
  CANCEL = 'cancelled',
  FAILED = 'failed',
}

export enum PaymentMethod {
  CARD = 'card',
  TRANS = 'trans',
  VBANK = 'vbank',
  PHONE = 'phone',
  SAMSUNG = 'samsung',
  KPAY = 'kpay',
  KAKAOPAY = 'kakaopay',
  PAYCO = 'payco',
  LPAY = 'lpay',
  SSGPAY = 'ssgpay',
  TOSSPAY = 'tosspay',
  CULTURELAND = 'cultureland',
  SMARTCULTURE = 'smartculture',
  HAPPYMONEY = 'happymoney',
  BOOKNLIFE = 'booknlife',
  POINT = 'point',
  WECHAT = 'wechat',
  ALIPAY = 'alipay',
  UNIONPAY = 'unionpay',
  TENPAY = 'tenpay',
}

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class Payment {
  @Prop({ type: String, default: null })
  imp_uid?: string;

  @Prop({ type: String })
  merchant_uid?: string;

  @Prop({ type: Types.ObjectId, ref: 'Service', required: true })
  service: Types.ObjectId;

  @Prop({ type: Types.ObjectId, required: true, ref: Account.name })
  buyer: Types.ObjectId;

  @Prop({ type: String, enum: PaymentStatus, default: PaymentStatus.READY })
  status: PaymentStatus;

  readonly created_at: Date;

  readonly updated_at: Date;

  readonly index: number;

  @Prop({ type: Date, default: null })
  canceled_at?: Date;

  @Prop({ type: Date, default: null })
  payment_at?: Date;

  @Prop({ type: String, enum: PaymentMethod })
  method: PaymentMethod;

  @Prop({ type: Number, required: true })
  amount: number;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
