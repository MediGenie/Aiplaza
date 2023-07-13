import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Board, BoardSchema } from '../schema/board.schema';
import { BoardRepository } from './board.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Board.name, schema: BoardSchema }]),
  ],
  providers: [BoardRepository],
  exports: [BoardRepository],
})
export class BoardDataModule {}
