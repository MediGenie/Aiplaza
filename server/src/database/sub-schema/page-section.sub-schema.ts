import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { PageColumn, PageColumnSchema } from './page-column.sub-schema';

@Schema({ _id: false })
export class PageSection {
  @Prop({ type: String, required: true })
  key: string;

  @Prop({ type: String, required: true })
  label: string;

  @Prop({ type: [PageColumnSchema], required: true })
  columns: PageColumn[];
}

export const PageSectionSchema = SchemaFactory.createForClass(PageSection);
