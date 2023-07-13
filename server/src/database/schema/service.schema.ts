import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { isEmail } from 'class-validator';
import { Media } from 'src/database/sub-schema/media.sub-schema';
import { Account } from './account.schema';

export type ServiceDocument = HydratedDocument<Service>;

@Schema({ timestamps: { createdAt: 'created_at' } })
export class Service {
  @Prop({ type: Types.ObjectId, required: true, ref: Account.name })
  owner: Types.ObjectId;

  @Prop({ type: String, required: true })
  name: string;

  readonly created_at: Date;

  readonly index: number;

  @Prop({ type: Date, default: null })
  deleted_at?: Date;

  @Prop({
    type: Number,
    required: true,
    min: 0,
    validate: {
      validator: Number.isInteger,
      message: 'price is not an integer value',
    },
  })
  price: number;

  @Prop({ type: Number, default: 0 })
  buyer_count: number;

  @Prop({ type: Number, default: 0 })
  user_count: number;

  @Prop({ type: Number, default: 0 })
  average_rate: number;

  @Prop({ type: Number, default: 0 })
  review_count: number;

  @Prop({ type: String, default: '' })
  description: string;

  @Prop({ type: Media, required: true })
  thumbnail: Media;

  @Prop({
    type: String,
    required: true,
    validate: {
      validator: (v: any) => isEmail(v),
      message: 'email 은 이메일 형식을 지켜야합니다.',
    },
  })
  email: string;

  @Prop({ type: Number, default: 0 })
  bookmark_count: number;
}

export const ServiceSchema = SchemaFactory.createForClass(Service);
