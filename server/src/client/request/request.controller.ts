import { Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { Body } from '@nestjs/common/decorators';
import { Types } from 'mongoose';
import {
  AccountType,
  AccountDocument,
} from 'src/database/schema/account.schema';
import { AccessableUserType } from 'src/decorators/accessable-user-type.decorator';
import { ClientController } from 'src/decorators/client-controller.decorator';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { ClientJwtGuard } from '../guards/client-jwt.guard';
import { UserTypeGuard } from '../guards/user-type.guard';
import { GetListDto } from '../service/dto/getlist.dto';
import { RequestService } from './request.service';

@ClientController('consumer/request')
export class RequestController {
  constructor(private readonly requestService: RequestService) {}

  @Get('list')
  @AccessableUserType(AccountType.CONSUMER)
  @UseGuards(ClientJwtGuard, UserTypeGuard)
  async getRequestList(
    @Query() query: GetListDto,
    @CurrentUser() user: AccountDocument,
  ) {
    const sort =
      query.sort !== undefined
        ? {
            field: query.sort,
            order: 'asc',
          }
        : undefined;
    const filter = query.search
      ? {
          field: 'all',
          text: query.search,
        }
      : undefined;
    return this.requestService.getRequestList(
      query.page,
      10,
      sort,
      filter,
      user._id,
    );
  }

  @Post('result')
  @UseGuards(ClientJwtGuard, UserTypeGuard)
  async getRequestResult(@Body() body: string) {
    return this.requestService.getRequestResult(body);
  }
}
