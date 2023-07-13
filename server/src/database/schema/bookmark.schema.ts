import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Account } from './account.schema';
import { Service } from './service.schema';

export type BookmarkDocument = HydratedDocument<Bookmark>;

@Schema({ timestamps: { createdAt: 'created_at' } })
export class Bookmark {
  @Prop({ type: Types.ObjectId, required: true, ref: Service.name })
  service: Types.ObjectId;

  @Prop({ type: Types.ObjectId, required: true, ref: Account.name })
  user: Types.ObjectId;

  readonly created_at: Date;
}

export const BookmarkSchema = SchemaFactory.createForClass(Bookmark);
