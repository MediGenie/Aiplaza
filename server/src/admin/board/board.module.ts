import { Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { BoardDataModule } from 'src/database/board-data/board-data.module';
import { FileUploadModule } from 'src/file-upload/file-upload.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Board, BoardSchema } from 'src/database/schema/board.schema';

@Module({
  imports: [
    BoardDataModule,
    FileUploadModule,
    MongooseModule.forFeature([
      {
        name: Board.name,
        schema: BoardSchema,
      },
    ]),
  ],
  controllers: [BoardController],
  providers: [BoardService],
})
export class BoardModule {}
