import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { BoardRepository } from 'src/database/board-data/board.repository';

@Injectable()
export class BoardService {
  constructor(private readonly boardRepository: BoardRepository) {}

  getListAndCount(page: number) {
    return this.boardRepository.getListAndCount(page);
  }

  getOne(id: Types.ObjectId) {
    return this.boardRepository.getOne(id);
  }
}
