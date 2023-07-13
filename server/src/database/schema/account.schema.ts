import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ConsumerInfo } from 'src/database/sub-schema/consumer-info.sub-schema';
import { Media } from 'src/database/sub-schema/media.sub-schema';
import { ServiceProviderInfo } from 'src/database/sub-schema/service-provider-info.sub-schema';

export type AccountDocument = HydratedDocument<Account>;

export enum AccountType {
  PROVIDER = 'Provider',
  CONSUMER = 'Consumer',
}

export enum RegisterFrom {
  EMAIL = 'email',
  GOOGLE = 'google',
  NAVER = 'naver',
  APPLE = 'apple',
}

export enum UserType {
  PERSONAL = '개인',
  BIZ = '법인',
  GROUP = '단체',
}

export enum AccountStatus {
  READY = '승인대기',
  GRANT = '승인',
  REJECT = '거절',
  DELETE = '삭제',
  LEAVE = '탈퇴',
}

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class Account {
  @Prop({ type: String, enum: AccountType, required: true })
  type: AccountType;

  @Prop({ type: String, enum: RegisterFrom, required: true })
  register_from: RegisterFrom;

  @Prop({ type: String, default: '' })
  email: string;

  @Prop({ type: String, default: '' })
  social_key: string;

  @Prop({
    type: String,
    required: function () {
      return this.type === RegisterFrom.EMAIL;
    },
  })
  password: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({
    type: String,
    required: true,
    // validate: {
    //   validator: function (v: string) {
    //     return /^\d{10,11}$/.test(v);
    //   },
    //   message: (v: any) =>
    //     `tel은 10자 혹은 11자만 입력 가능합니다. 현재: ${v?.length || 'NaN'}`,
    // },
  })
  tel: string;

  readonly created_at: Date;

  readonly updated_at: Date;

  readonly index: number;

  @Prop({ type: Date, default: null })
  deleted_at?: Date;

  @Prop({ type: String, enum: UserType, required: true })
  user_type: UserType;

  @Prop({ type: String, required: true })
  country: string;

  @Prop({ type: String, required: true })
  research_field: string;

  @Prop({ type: String, required: true })
  analysis_field: string;

  @Prop({ type: String, required: true })
  address: string;

  @Prop({ type: String, required: true })
  address_detail: string;

  @Prop({ type: Media, required: true })
  biz_regist_cert_file: Media;

  @Prop({ type: String, enum: AccountStatus, default: AccountStatus.READY })
  status: AccountStatus;

  @Prop({ type: ServiceProviderInfo, default: null })
  provider_info?: ServiceProviderInfo;

  @Prop({ type: ConsumerInfo, default: null })
  consumer_info?: ConsumerInfo;

  @Prop({ type: String, default: '' })
  auth_key: string;
}

export const AccountSchema = SchemaFactory.createForClass(Account);
