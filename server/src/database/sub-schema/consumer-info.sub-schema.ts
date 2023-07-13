import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ _id: false })
export class ConsumerInfo {
  @Prop({ type: String, default: '' })
  interest_disease: string;

  @Prop({ type: String, default: '' })
  interest_field: string;

  @Prop({ type: String, default: '' })
  interest_video_mobility: string;

  @Prop({ type: String, default: '' })
  interest_grade: string;

  @Prop({ type: String, default: '' })
  biz_name: string;

  @Prop({ type: String, default: '' })
  forecasts_number_per_month: string;

  @Prop({ type: Number, default: 0 })
  total_payment: number;

  @Prop({ type: Number, default: 0 })
  total_pay_service: number;

  @Prop({ type: Number, default: 0 })
  total_use_service: number;
}
