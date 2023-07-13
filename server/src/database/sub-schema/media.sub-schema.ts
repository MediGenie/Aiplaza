import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ _id: false })
export class Media {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: Number, required: true, min: 0 })
  size: number;

  @Prop({ type: String, required: true })
  type: string;

  @Prop({ type: String, required: true })
  key: string;

  @Prop({ type: String, required: true })
  url: string;
}
