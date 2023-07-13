import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import {
  PageSection,
  PageSectionSchema,
} from 'src/database/sub-schema/page-section.sub-schema';
import { Service } from './service.schema';

export type ServicePageInfoDocument = HydratedDocument<ServicePageInfo>;

export enum ServicePageInfoTemplate {
  TEMPLATE_01 = 'TEMPLATE_1',
  TEMPLATE_02 = 'TEMPLATE_2',
  TEMPLATE_03 = 'TEMPLATE_3',
}

@Schema({ timestamps: { createdAt: 'created_at' } })
export class ServicePageInfo {
  @Prop({ type: Types.ObjectId, required: true, ref: Service.name })
  service: Types.ObjectId;

  @Prop({ type: String, enum: ServicePageInfoTemplate, required: true })
  template: ServicePageInfoTemplate;

  @Prop({ type: [PageSectionSchema], required: true })
  data: PageSection[];

  readonly created_at: Date;
}

export const ServicePageInfoSchema =
  SchemaFactory.createForClass(ServicePageInfo);
