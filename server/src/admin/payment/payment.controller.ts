import { IdDto } from './../../common/dto/id.dto';
import { Types } from 'mongoose';
import { AdminJwtGuard } from './../guards/admin.jwt.guard';
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AdminController } from 'src/decorators/admin-controller.decorator';
import { PaymentService } from './payment.service';
import { GetPaymentListDto } from './dto/getPaymentrList.dto';

@AdminController('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get()
  @UseGuards(AdminJwtGuard)
  async getList(@Query() query: GetPaymentListDto) {
    const sort =
      query.sort && query.sort instanceof Array
        ? {
            field: query.sort[0],
            order: query.sort[1],
          }
        : undefined;
    const filter = query.search
      ? {
          field: query.search_attr ? query.search_attr : 'all',
          text: query.search,
        }
      : undefined;
    return this.paymentService.getList(query.page, 10, sort, filter);
  }

  @Get(':id')
  @UseGuards(AdminJwtGuard)
  async getOne(@Param() param: IdDto) {
    const _id = new Types.ObjectId(param.id);
    return await this.paymentService.getOne(_id);
  }

  @Patch()
  @UseGuards(AdminJwtGuard)
  async cancelPayment(@Body() body: IdDto) {
    const _id = new Types.ObjectId(body.id);
    return await this.paymentService.cancelPayment(_id);
  }
}
