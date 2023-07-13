import { Body, Get, Patch, Query, UseGuards } from '@nestjs/common';
import { AdminController } from 'src/decorators/admin-controller.decorator';
import { AdminJwtGuard } from '../guards/admin.jwt.guard';
import { GetWithdrawListDto } from './dto/getWithdrawList.dto';
import { RestoreAccountDto } from './dto/restoreAccount.dto';
import { WithdrawService } from './withdraw.service';

@AdminController('withdraw')
export class WithdrawController {
  constructor(private readonly withdrawService: WithdrawService) {}

  @Get()
  @UseGuards(AdminJwtGuard)
  async getList(@Query() query: GetWithdrawListDto) {
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
    return this.withdrawService.getList(query.page, 10, sort, filter);
  }

  @Patch()
  @UseGuards(AdminJwtGuard)
  async restoreAccounts(@Body() body: RestoreAccountDto) {
    return this.withdrawService.restoreAccounts(body._ids);
  }
}
