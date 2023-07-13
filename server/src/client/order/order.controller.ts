import { Body, Post, UseGuards } from '@nestjs/common';
import {
  AccountDocument,
  AccountType,
} from 'src/database/schema/account.schema';
import { AccessableUserType } from 'src/decorators/accessable-user-type.decorator';
import { ClientController } from 'src/decorators/client-controller.decorator';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { ClientJwtGuard } from '../guards/client-jwt.guard';
import { UserTypeGuard } from '../guards/user-type.guard';
import { CreateReadyDto } from './order.dto';
import { OrderService } from './order.service';

@ClientController('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('ready')
  @AccessableUserType(AccountType.CONSUMER)
  @UseGuards(ClientJwtGuard, UserTypeGuard)
  readyOrder(
    @Body() body: CreateReadyDto,
    @CurrentUser() user: AccountDocument,
  ) {
    return this.orderService.readyOrder(body.service, user._id.toString());
  }
}
