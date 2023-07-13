import { Controller, Get, Param, Query } from '@nestjs/common';
import { Types } from 'mongoose';
import { ClientController } from 'src/decorators/client-controller.decorator';
import { BoardService } from './board.service';
import { GetListDto } from './dto/getlist.dto';

@ClientController('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Get()
  async getList(@Query() query: GetListDto) {
    return this.boardService.getListAndCount(query.page);
  }

  @Get(':id')
  getOne(@Param('id') id: Types.ObjectId) {
    return this.boardService.getOne(id);
  }
}
