import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import {
  FormSection,
  FormSectionSchema,
} from 'src/database/sub-schema/form-section.sub-schema';
import { Media } from 'src/database/sub-schema/media.sub-schema';
import { Service } from './service.schema';

export type ServiceFormDocument = HydratedDocument<ServiceForm>;

@Schema({ timestamps: { createdAt: 'created_at' } })
export class ServiceForm {
  @Prop({ type: Types.ObjectId, required: true, ref: Service.name })
  service: Types.ObjectId;

  @Prop({ type: [FormSectionSchema], required: true })
  data: FormSection[];

  @Prop({ type: Media })
  program_file?: Media;

  readonly created_at: Date;
}

export const ServiceFormSchema = SchemaFactory.createForClass(ServiceForm);
