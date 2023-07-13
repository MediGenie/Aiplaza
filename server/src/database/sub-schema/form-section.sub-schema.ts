import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { FormColumn, FormColumnSchema } from './form-column.sub-schema';

@Schema({ _id: false })
export class FormSection {
  @Prop({ type: String, required: true })
  label: string;
  @Prop({ type: String, default: '' })
  description: string;
  @Prop({ type: [FormColumnSchema], required: true })
  column: FormColumn[];
}

export const FormSectionSchema = SchemaFactory.createForClass(FormSection);
