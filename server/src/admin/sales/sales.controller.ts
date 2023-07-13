import { Types } from 'mongoose';
import { IdDto } from './../../common/dto/id.dto';
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AdminController } from 'src/decorators/admin-controller.decorator';
import { AdminJwtGuard } from '../guards/admin.jwt.guard';
import { GetSalesListDto } from './dto/getSalesrList.dto';
import { SalesService } from './sales.service';
import { CreateOneDto } from './dto/createone.dto';
import { UpdateOneDto } from './dto/updateOne.dto';
import { FindProvider } from './dto/findProvider.dto';

@AdminController('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Get()
  @UseGuards(AdminJwtGuard)
  async getList(@Query() query: GetSalesListDto) {
    const sort =
      query.sort && query.sort instanceof Array
        ? {
            field: query.sort[0],
            order: query.sort[1],
          }
        : undefined;
    const filter = {
      field: query.search_attr ? query.search_attr : 'all',
      text: query.search,
    };

    return this.salesService.getList(query.page, 10, sort, filter);
  }

  @Get(':id')
  @UseGuards(AdminJwtGuard)
  async getOne(@Param() param: IdDto) {
    const _id = new Types.ObjectId(param.id);
    return await this.salesService.getOne(_id);
  }

  @Post()
  @UseGuards(AdminJwtGuard)
  createOne(@Body() body: CreateOneDto) {
    return this.salesService.create(body);
  }

  @Patch('find-provider')
  @UseGuards(AdminJwtGuard)
  findProvider(@Body() body: FindProvider) {
    return this.salesService.findProvider(body.search);
  }

  @Patch('get-last-amount')
  @UseGuards(AdminJwtGuard)
  getLastAmount(@Body() body: IdDto) {
    const _id = new Types.ObjectId(body.id);
    return this.salesService.getLastAmount(_id);
  }

  @Patch(':id')
  @UseGuards(AdminJwtGuard)
  updateOne(@Param('id') id: string, @Body() body: UpdateOneDto) {
    const _id = new Types.ObjectId(id);
    return this.salesService.updateOne(_id, body.note);
  }
}
