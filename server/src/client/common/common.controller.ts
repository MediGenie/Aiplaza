import { Body, Controller, Post } from '@nestjs/common';
import { Types } from 'mongoose';
import { ClientController } from 'src/decorators/client-controller.decorator';
import { GetCookie } from 'src/decorators/get-cookie.decorator';
import { CommonService } from './common.service';

@ClientController('common')
export class CommonController {
  constructor(private readonly commonService: CommonService) {}

  @Post('request/response')
  getRequestResponse(@Body() body: any) {
    return this.commonService.getRequestResult(body._id);
  }
}
