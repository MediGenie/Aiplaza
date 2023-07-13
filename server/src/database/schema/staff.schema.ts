import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type StaffDocument = HydratedDocument<Staff>;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class Staff {
  @Prop({ type: String, required: true })
  user_id: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, default: '' })
  auth_key: string;

  readonly created_at: Date;

  readonly updated_at: Date;

  readonly index: number;

  @Prop({ type: Date, default: null })
  deleted_at: Date;
}

export const StaffSchema = SchemaFactory.createForClass(Staff);
