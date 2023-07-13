import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false })
export class FormTable {
  @Prop({ type: [String], required: true })
  rows: string[];
}

export const FormTableSchema = SchemaFactory.createForClass(FormTable);
