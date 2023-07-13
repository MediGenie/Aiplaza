import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Media } from './media.sub-schema';

export enum PageColumnTypeEnum {
  IMAGE = 'image',
  SENTENCE = 'sentence',
  TEXT = 'text',
  COLOR = 'color',
  RICH = 'rich',
}

@Schema({ _id: false })
export class PageColumn {
  @Prop({ type: String, required: true })
  key: string;

  @Prop({ type: String, required: true })
  label: string;

  @Prop({ type: String, enum: PageColumnTypeEnum, required: true })
  type: PageColumnTypeEnum;

  @Prop({ type: String, default: null })
  content: string;

  @Prop({ type: String, default: null })
  color: string;

  @Prop({ type: Media, default: null })
  image: Media;
}

export const PageColumnSchema = SchemaFactory.createForClass(PageColumn);
