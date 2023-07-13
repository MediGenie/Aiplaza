import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { FormTable, FormTableSchema } from './form-table.sub-schema';
import { Media } from './media.sub-schema';

enum FormColumnType {
  TITLE = 'title',
  TEXT = 'text',
  NUMBER = 'number',
  FILE = 'file',
  DROPROWN = 'droprown',
  RADIO = 'radio',
  CHECKBOX = 'checkbox',
  SLIDE = 'slide',
  SPINNER = 'spinner',
  LINEAR = 'linear',
}

@Schema({ _id: false })
export class FormColumn {
  @Prop({ type: String, enum: FormColumnType /* required: true */ })
  type: FormColumnType;

  @Prop({ type: String /* required: true */ })
  label: string;

  @Prop({ type: String, default: '' })
  description: string;

  @Prop({ type: Media, default: null })
  image?: Media;

  @Prop({ type: [FormTableSchema], default: null })
  table?: FormTable;

  @Prop({ type: [String], default: null })
  items?: string[];

  @Prop({ type: Number, default: null })
  min_slide?: number;

  @Prop({ type: Number, default: null })
  max_slide?: number;

  @Prop({ type: Number, default: null })
  min_linear?: number;

  @Prop({ type: Number, default: null })
  max_linear?: number;

  @Prop({ type: String, default: null })
  min_linear_label?: string;

  @Prop({ type: String, default: null })
  max_linear_label?: string;

  @Prop({ type: Number, default: null })
  spinner_init?: number;

  @Prop({ type: [String], default: null })
  allow_mime?: string[];

  @Prop({ type: Boolean, default: true })
  required: boolean;

  @Prop({ type: Number, default: 0 })
  limit_file_number: number;

  @Prop({ type: Number, default: 0 })
  limit_file_size: number;

  @Prop({ type: Number, default: 0 })
  max_checkbox_count: number;

  @Prop({ type: Boolean, default: false })
  etc_field: boolean;

  @Prop({ type: Number, default: null })
  slide_init?: number;

  @Prop({ type: Boolean, default: false })
  fixed_slide: boolean;
}

export const FormColumnSchema = SchemaFactory.createForClass(FormColumn);
