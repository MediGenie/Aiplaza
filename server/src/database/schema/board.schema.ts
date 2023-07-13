import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Media } from 'src/database/sub-schema/media.sub-schema';

export type BoardDocument = HydratedDocument<Board>;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class Board {
  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String, required: true })
  content: string;

  @Prop({ type: Media, default: null })
  image?: Media;

  readonly created_at: Date;

  readonly updated_at: Date;

  readonly index: number;
}

export const BoardSchema = SchemaFactory.createForClass(Board);
