import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import {
  FormSectionSchema,
  FormSection,
} from '../sub-schema/form-section.sub-schema';
import { Media } from '../sub-schema/media.sub-schema';
import { Account } from './account.schema';
import { Payment } from './payment.schema';
import { Service } from './service.schema';

export type ServiceUsageDocument = HydratedDocument<ServiceUsage>;

export enum ServiceUsageStatus {
  NOT_USE = '이용전',
  USED = '이용완료',
  CANCEL = '구매취소',
}

@Schema({ timestamps: { createdAt: 'created_at' } })
export class ServiceUsage {
  @Prop({ type: Types.ObjectId, required: true, ref: Service.name })
  service: Types.ObjectId;

  @Prop({ type: Types.ObjectId, required: true, ref: Account.name })
  buyer: Types.ObjectId;

  readonly created_at: Date;

  readonly index: number;

  @Prop({
    type: Number,
    required: true,
    min: 0,
    validate: {
      validator: Number.isInteger,
      message: 'price is not integer',
    },
  })
  price: number;

  @Prop({ type: String, enum: ServiceUsageStatus, required: true })
  status: ServiceUsageStatus;

  @Prop({ type: Number, default: 0 })
  rate: number;

  @Prop({ type: String, default: '' })
  review: string;

  @Prop({ type: Types.ObjectId, required: true, ref: Payment.name })
  payment: Types.ObjectId;

  @Prop({ type: [FormSectionSchema], default: null })
  result_form: FormSection[];

  // 연세대 결과
  @Prop({ type: Object, default: null })
  response?: Record<string, unknown>;

  // 사용자 응답
  @Prop({ type: Object, default: null })
  result?: Record<string, unknown>;

  @Prop({ type: Date, default: '' })
  resultAt?: Date;

  @Prop({ type: Object, default: null })
  thumbnail_content: {
    title: string;
    description: string;
    thumbnail: Media;
  };
}

export const ServiceUsageSchema = SchemaFactory.createForClass(ServiceUsage);
