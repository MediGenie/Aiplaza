import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ _id: false })
export class ServiceProviderInfo {
  @Prop({ type: String, default: '' })
  type: string;

  @Prop({ type: String, default: '' })
  domain_field: string;

  @Prop({ type: String, default: '' })
  biz_type: string;

  @Prop({ type: String, default: '' })
  service_type: string;

  @Prop({ type: String, default: '' })
  service_subject: string;

  @Prop({ type: String, default: '' })
  service_range: string;

  @Prop({ type: String, default: '' })
  model_type: string;

  @Prop({ type: String, default: '' })
  algorithm_program_type: string;

  @Prop({ type: Number, default: 0 })
  total_revenue: number;

  @Prop({ type: Number, default: 0 })
  total_withdrawer: number;

  @Prop({ type: Number, default: 0 })
  rest_revenue: number;
}
